'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DotIcon } from 'lucide-react';
import clsx from 'clsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast'; //optional
import { Textarea } from '@/components/ui/textarea';
import { AnimatedButton } from './ui/Buttons';
import useDialog from '@/hooks/useDialog';
import { Loader2 } from 'lucide-react';

interface FormInputs {
  singleErrorInput: string;
}

const schema = z.object({
  name: z
    .string()
    .min(2, { message: 'Namnet måste vara minst 2 tecken långt' }),

  business: z
    .string()
    // .min(2, { message: 'Företagsnamnet måste vara minst 2 tecken långt' })
    // .max(100, { message: 'Företagsnamnet kan vara högst 100 tecken långt' })
    // .regex(/^[\w\s-]+$/, {
    //   message: 'Företagsnamnet innehåller ogiltiga tecken',
    // })
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

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const { onClose } = useDialog();

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

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = form;

  // Define a helper delay function for redability
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Create the handler that connects to EmailJS.
  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('response:', response);

      if (response.ok) {
        const responseData = await response.json();
        console.log('responseData:', responseData);

        // Introduced a delay before resetting and closing the dialog
        await delay(600);
        reset();
        await delay(450);
        onClose();
        toast({
          title: 'Skickat!',
          description: 'Vi har mottagit ditt meddelande.',
          className: 'toast bg-accent',
        });
      } else {
        const { error } = await response.json();
        console.log('Error:', error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Kiren = () => {
    return <DotIcon className="relative -inset-1 size-5" />;
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-y-2"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex text-lg">
                  Namn <Kiren />
                </FormLabel>
                <FormControl>
                  <Input
                    className={clsx(
                      'bg-secondary',
                      form.formState.errors.name && 'border-destructive',
                      'border', // Lägg till standard border om det behövs
                    )}
                    placeholder="Ditt namn"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-4">
                  <FormMessage className="text-xs">
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex text-lg">
                  E-post <Kiren />
                </FormLabel>
                <FormControl>
                  <Input
                    className={clsx(
                      'bg-secondary',
                      form.formState.errors.email && 'border-destructive',
                      'border', // Lägg till standard border om det behövs
                    )}
                    placeholder="Ditt epostadress"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-4">
                  <FormMessage className="text-xs">
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          {/* Business */}
          <FormField
            control={form.control}
            name="business"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Företag</FormLabel>
                <FormControl>
                  <Input
                    className="border bg-secondary"
                    placeholder="Eventuell företagsnamn"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-2">
                  <FormMessage className="text-xs">
                    {form.formState.errors.business?.message}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex text-lg">
                  Meddelande <Kiren />
                </FormLabel>
                <FormControl>
                  <Textarea
                    className={clsx(
                      'bg-secondary',
                      form.formState.errors.message && 'border-destructive',
                      'border', // Lägg till standard border om det behövs
                    )}
                    placeholder="Meddelande"
                    rows={6}
                    id="message"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-4">
                  <FormMessage className="text-xs">
                    {form.formState.errors.message?.message}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          <div className="mt-2 sm:self-start">
            <AnimatedButton disabled={isSubmitting} type="submit">
              Skicka
              {isSubmitting ?? (
                <span>
                  <Loader2 className="size-5 animate-spin" />
                  Skickar
                </span>
              )}
            </AnimatedButton>
          </div>
        </form>
      </Form>
    </>
  );
};
export default ContactForm;
