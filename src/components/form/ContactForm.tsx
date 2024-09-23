'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DotIcon } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { useToast } from '@/components/ui/use-toast'; //optional
import { Textarea } from '@/components/ui/textarea';
import AnimatedButton from '../ui/MotionButton';

const schema = z.object({
  name: z
    .string()
    .min(2, { message: 'Namnet måste vara minst 2 tecken långt' }),

  business: z
    .string()
    .min(2, { message: 'Företagsnamnet måste vara minst 2 tecken långt' })
    .max(100, { message: 'Företagsnamnet kan vara högst 100 tecken långt' })
    .regex(/^[\w\s-]+$/, {
      message: 'Företagsnamnet innehåller ogiltiga tecken',
    })
    .optional(),

  email: z.string().email({ message: 'Ogiltig e-postadress' }),
  message: z.string().min(1, { message: 'Meddelandet är obligatoriskt' }),
  // marketingSource: z
  //   .enum([
  //     'Google',
  //     'Sociala medier',
  //     'Rekommendation',
  //     'Tidigare kund',
  //     'Annons',
  //     'Annat',
  //   ])
  //   .optional(), // Gör fältet valfritt
  // otherSource: z.string().optional(), // Valfritt fält för att specificera "Annat"
});
// .refine(
//   (data) => {
//     if (data.marketingSource === 'Annat') {
//       return data.otherSource && data.otherSource.length > 0;
//     }
//     return true;
//   },
//   {
//     message: 'Vänligen specificera hur du hittade oss',
//     path: ['otherSource'],
//   },
// );

const ContactForm = () => {
  // const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      business: '',
      email: '',
      // marketingSource: undefined,
      // otherSource: '',
      message: '',
    },
  });

  // Create the handler that connects to EmailJS.
  const onSubmit = (data: z.infer<typeof schema>) => {
    // some code here
    //         .then(
    //           () => {
    //             form.reset(); //clear the fields after submission
    //           },
    //           (error) => {
    //             console.warn('FAILED...', JSON.stringify(error));
    //          },
    //        );
    // }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 grid space-y-6"
        >
          {/* Name */}
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex text-lg">
                  Namn <DotIcon className="relative -inset-1.5 size-6" />
                </FormLabel>

                <FormControl>
                  <Input
                    className="border-primary bg-secondary"
                    placeholder="Ditt namn"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs">
                  {form.formState.errors.name?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex text-lg">
                  E-post <DotIcon className="relative -inset-1.5 size-6" />
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-primary bg-secondary"
                    placeholder="Ditt epostadress"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs">
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          {/* Business */}
          <FormField
            name="business"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Företag</FormLabel>
                <FormControl>
                  <Input
                    className="border-primary bg-secondary"
                    placeholder="Ditt företagsnamn"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs">
                  {form.formState.errors.business?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          {/* Message */}
          <FormField
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex text-lg">
                  Meddelande <DotIcon className="relative -inset-1.5 size-6" />
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="border-primary bg-secondary"
                    placeholder="Meddelande"
                    id="message"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs">
                  {form.formState.errors.message?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <AnimatedButton
            size="lg"
            type="submit"
            className="sm:justify-self-start"
          >
            Skicka
          </AnimatedButton>
        </form>
      </Form>
    </>
  );
};
export default ContactForm;
