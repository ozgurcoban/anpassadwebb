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
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AnimatedButton } from './ui/Buttons';
import useDialog from '@/hooks/useDialog';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const schema = z.object({
  name: z
    .string()
    .min(2, { message: 'Namnet måste vara minst 2 tecken långt' }),

  email: z.string().email({ message: 'Ogiltig e-postadress' }),
  
  website: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === '') return true;
        try {
          const url = new URL(val);
          // Check if it has a valid domain with TLD
          const hostname = url.hostname;
          // Must have at least one dot and valid TLD
          const domainRegex = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
          return domainRegex.test(hostname);
        } catch {
          return false;
        }
      },
      { message: 'Ogiltig webbadress' }
    ),
    
  source: z.enum([
    'google',
    'recommendation',
    'ai',
    'social',
    'website',
    'other'
  ]).optional(),
  
  selectedPackage: z.string().optional(),
    
  message: z
    .string()
    .min(10, { message: 'Meddelandet måste vara minst 10 tecken långt' }),
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

interface ContactFormProps {
  selectedPackage?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ selectedPackage }) => {
  const { toast } = useToast();
  const { onClose } = useDialog();

  // const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      website: '',
      source: undefined,
      selectedPackage: selectedPackage || '',
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

      if (response.ok) {
        const responseData = await response.json();

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
      }
    } catch (error) {
      // Error handled silently
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
          {/* Selected Package Display */}
          {selectedPackage && (
            <div className="mb-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-sm font-medium text-accent">
                Du har valt: <span className="font-semibold">{selectedPackage}</span>
              </p>
            </div>
          )}
          
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
                      'bg-muted py-6 text-base shadow-inner',
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
                      'bg-muted py-6 text-base shadow-inner',
                      form.formState.errors.email && 'border-destructive',
                      'border',
                    )}
                    placeholder="din@epost.se"
                    type="email"
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
          {/* Website */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="mt-1">
                <FormLabel className="mt-2 px-2 text-base sm:text-lg">
                  Hemsida
                </FormLabel>
                <FormControl>
                  <Input
                    className="border bg-muted py-6 text-base shadow-inner"
                    placeholder="dinhemsida.se (valfritt)"
                    type="text"
                    {...field}
                    onBlur={(e) => {
                      const value = e.target.value.trim();
                      if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
                        field.onChange(`https://${value}`);
                      }
                      field.onBlur();
                    }}
                  />
                </FormControl>
                <div className="min-h-2">
                  <FormMessage className="pl-2 text-xs">
                    {form.formState.errors.website?.message}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          {/* Source */}
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2 px-2 text-base sm:text-lg">
                  Hur hittade du oss?
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-muted py-6 text-base shadow-inner">
                      <SelectValue placeholder="Välj ett alternativ (valfritt)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="google">Google-sökning</SelectItem>
                    <SelectItem value="recommendation">Rekommendation</SelectItem>
                    <SelectItem value="ai">ChatGPT/AI</SelectItem>
                    <SelectItem value="social">Sociala medier</SelectItem>
                    <SelectItem value="website">Annan webbsida</SelectItem>
                    <SelectItem value="other">Annat</SelectItem>
                  </SelectContent>
                </Select>
                <div className="min-h-4">
                  <FormMessage className="pl-2 text-xs">
                    {form.formState.errors.source?.message}
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
                      'bg-muted text-base shadow-inner',
                      form.formState.errors.message && 'border-destructive',
                      'border',
                    )}
                    placeholder="Berätta om ditt projekt..."
                    rows={6}
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

          <div className="mt-4 grid sm:inline-block">
            <AnimatedButton
              disabled={isSubmitting}
              type="submit"
              className="shadow-md"
              variant="default"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Skickar...
                </>
              ) : (
                'Skicka meddelande'
              )}
            </AnimatedButton>
          </div>
        </form>
      </Form>
    </>
  );
};
export default ContactForm;
