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
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedButton } from './ui/Buttons';
import useDialog from '@/hooks/useDialog';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ContactFormData {
  business: string;
  message: string;
  terms: boolean;
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
  terms: z.boolean().refine((data) => data === true, {
    message: 'Du måste godkänna villkoren',
  }),

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
      terms: false,
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
    return <DotIcon className="relative -inset-1 size-5 bg-transparent" />;
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col sm:gap-y-2"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex px-2 text-base sm:text-lg">
                  Namn <Kiren />
                </FormLabel>
                <FormControl>
                  <Input
                    className={clsx(
                      'bg-secondary py-6 text-base text-secondary shadow-inner',
                      form.formState.errors.name && 'border-destructive',
                      'border',
                    )}
                    placeholder="Ditt namn"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-4">
                  <FormMessage className="pl-2 text-xs">
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
                <FormLabel className="mt-1 flex px-2 text-base sm:text-lg">
                  E-post <Kiren />
                </FormLabel>
                <FormControl>
                  <Input
                    className={clsx(
                      'bg-secondary py-6 text-base shadow-inner',
                      form.formState.errors.email && 'border-destructive',
                      'border', // Lägg till standard border om det behövs
                    )}
                    placeholder="Ditt epostadress"
                    {...field}
                  />
                </FormControl>
                <div className="mb-4 min-h-4">
                  <FormMessage className="pl-2 text-xs">
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
              <FormItem className="mt-1">
                <FormLabel className="mt-2 px-2 text-base sm:text-lg">
                  Företag
                </FormLabel>
                <FormControl>
                  <Input
                    className="border bg-secondary py-6 text-base shadow-inner"
                    placeholder="Eventuell företagsnamn"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-2">
                  <FormMessage className="pl-2 text-xs">
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
                <FormLabel className="mt-2 flex px-2 text-base sm:text-lg">
                  Meddelande <Kiren />
                </FormLabel>
                <FormControl>
                  <Textarea
                    className={clsx(
                      'bg-secondary text-base shadow-inner',
                      form.formState.errors.message && 'border-destructive',
                      'border', // Lägg till standard border om det behövs
                    )}
                    placeholder="Meddelande"
                    rows={4}
                    id="message"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-4">
                  <FormMessage className="pl-2 text-xs">
                    {form.formState.errors.message?.message}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          {/* Terms and Conditions Checkbox */}
          <FormField
            control={form.control}
            name="terms"
            rules={{ required: 'Du måste godkänna villkoren' }}
            render={({ field }) => (
              <FormItem className="">
                <div className="mt-2 flex items-center">
                  <FormControl>
                    <Checkbox
                      className={clsx(
                        'bg-secondary text-base shadow-inner',
                        form.formState.errors.message && 'border-destructive',
                        'border',
                      )}
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <FormLabel
                    onClick={onClose}
                    className="ml-2 flex items-center text-base"
                    aria-label="Jag godkänner villkoren"
                  >
                    Jag godkänner{' '}
                    <Link
                      className="pointer-event font-semibold"
                      href="/villkor"
                    >
                      &nbsp;villkoren
                    </Link>
                    <Kiren />
                  </FormLabel>
                </div>
                <div className="hidden min-h-4 sm:block">
                  <FormMessage className="pl-6 text-xs" />
                </div>
              </FormItem>
            )}
          />

          <div className="mt-4 grid sm:inline-block">
            <AnimatedButton
              disabled={isSubmitting}
              type="submit"
              className="shadow-md"
            >
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
