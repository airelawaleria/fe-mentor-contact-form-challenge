import { FC } from 'react';
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

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'This field is required' }),
  lastName: z.string().min(1, { message: 'This field is required' }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  queryType: z.enum(['general', 'support'], { message: 'Please select a query type' }),
  message: z.string().min(1, { message: 'This field is required' }).max(500),
  consent: z.boolean({ required_error: 'To submit this form, please consent to being contacted' }),
});

export const ContactForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      queryType: undefined,
      message: '',
      consent: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Card className='mx-6 my-4 w-3/5'>
      <CardHeader className='flex flex-row items-start font-karla-bold'>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
            <div className='flex flex-row gap-4 justify-between'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='form-label'>
                      First Name <span className='text-green-600'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='form-label'>
                      Last Name <span className='text-green-600'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='form-label'>
                    Email Address <span className='text-green-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='queryType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='form-label'>
                    Query Type <span className='text-green-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-row space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='general' />
                        </FormControl>
                        <FormLabel className='font-normal'>General Enquiry</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='support' />
                        </FormControl>
                        <FormLabel className='font-normal'>Support Request</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='form-label'>
                    Message <span className='text-green-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} className='resize-none' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='consent'
              render={({ field }) => (
                <FormItem className='flex flex-row content-center justify-items-start items-center gap-3'>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className='!mt-0'>
                    I consent to being contacted by the team <span className='text-green-600'>*</span>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='bg-primary-green-600 text-white' type='submit'>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
