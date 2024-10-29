import { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';
import { v4 } from 'uuid';

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'This field is required' }),
  lastName: z.string().min(1, { message: 'This field is required' }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  queryType: z.enum(['general', 'support'], { message: 'Please select a query type' }),
  message: z.string().min(1, { message: 'This field is required' }).max(500),
  consent: z
    .boolean({ required_error: 'To submit this form, please consent to being contacted' })
    .refine((val) => val === true, {
      message: 'To submit this form, please consent to being contacted',
    }),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  queryType: undefined,
  message: '',
  consent: false,
};

export const ContactForm: FC = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
    },
    mode: 'onTouched',
  });
  /**
   * Required to reset the radio group key to force a re-render of the radio group
   */
  const [radioGroupKey, setRadioGroupKey] = useState<string>(v4());

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    form.reset();
    setRadioGroupKey(v4());
  };

  return (
    <Card className='mx-6 my-4 w-3/5 bg-white'>
      <CardHeader className='flex flex-row items-start font-karla-bold'>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <div className='flex flex-col md:flex-row justify-between gap-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field, fieldState }) => (
                  <FormItem className='flex-auto'>
                    <FormLabel className='form-label'>
                      First Name &nbsp;&nbsp;<span className='text-green-600'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} {...fieldState} />
                    </FormControl>
                    <FormMessage className='place-self-start text-primary-red !m-1' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field, fieldState }) => (
                  <FormItem className='flex-auto'>
                    <FormLabel className='form-label'>
                      Last Name &nbsp;&nbsp;<span className='text-green-600'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} {...fieldState} />
                    </FormControl>
                    <FormMessage className='place-self-start text-primary-red !m-1' />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className='form-label'>
                    Email Address &nbsp;&nbsp;<span className='text-green-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} {...fieldState} />
                  </FormControl>
                  <FormMessage className='place-self-start text-primary-red !m-1' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='queryType'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className='form-label'>
                    Query Type &nbsp;&nbsp;<span className='text-green-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className='flex flex-col md:flex-row gap-4'
                      {...field}
                      {...fieldState}
                      onValueChange={field.onChange}
                      key={radioGroupKey}
                    >
                      <FormItem className='radio-item'>
                        <FormControl>
                          <RadioGroupItem value='general' />
                        </FormControl>
                        <FormLabel>General Enquiry</FormLabel>
                      </FormItem>
                      <FormItem className='radio-item'>
                        <FormControl>
                          <RadioGroupItem value='support' />
                        </FormControl>
                        <FormLabel>Support Request</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className='place-self-start text-primary-red !m-1' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='message'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className='form-label'>
                    Message &nbsp;&nbsp;<span className='text-green-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} {...fieldState} className='resize-none' />
                  </FormControl>
                  <FormMessage className='place-self-start text-primary-red !m-1' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='consent'
              render={({ field, fieldState }) => (
                <FormItem className='flex flex-col'>
                  <div className='flex flex-row content-center justify-items-start items-center gap-3'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} {...fieldState} />
                    </FormControl>
                    <FormLabel className='!mt-0 hover:cursor-pointer'>
                      I consent to being contacted by the team &nbsp;&nbsp;<span className='text-green-600'>*</span>
                    </FormLabel>
                  </div>
                  <FormMessage className='text-primary-red !m-1 place-self-start' />
                </FormItem>
              )}
            />
            <Button
              className='bg-primary-green-600 text-white hover:bg-neutral-grey-900'
              type='submit'
              onClick={form.handleSubmit((data) => {
                onSubmit(data); // Log data to see successful submission
                toast({
                  className: 'bg-neutral-grey-900 w-auto h-20 p-8 text-white',
                  action: (
                    <div className='flex flex-col !m-0 gap-1'>
                      <div className='w-full flex gap-3 align-middle'>
                        <CheckCircle />
                        <span className='text-sm font-bold'>Message Sent!</span>
                      </div>
                      <span className='text-sm text-neutral-grey-500'>
                        Thanks for completing the form. We&apos;ll be in touch soon!
                      </span>
                    </div>
                  ),
                  duration: 5000,
                });
              })}
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
