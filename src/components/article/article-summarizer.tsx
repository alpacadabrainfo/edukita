'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getSummary } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Wand2, Loader2, ServerCrash, AlertCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState = {
  message: '',
  summary: '',
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full shrink-0 sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Membuat Ringkasan...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Ringkas dengan AI
        </>
      )}
    </Button>
  );
}

export default function ArticleSummarizer({ articleText }: { articleText: string }) {
  const [state, formAction] = useFormState(getSummary, initialState);
  const [openItem, setOpenItem] = useState('');
  
  useEffect(() => {
    if (state.message === 'success' && state.summary) {
      setOpenItem('summary');
    } else if (state.message === 'error') {
      setOpenItem('summary');
    }
  }, [state]);

  return (
    <div className="mb-6 rounded-lg border bg-secondary/30 p-4">
      <form action={formAction} className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="text-left">
          <h3 className="font-semibold font-headline">Hemat Waktu Anda</h3>
          <p className="text-sm text-muted-foreground">Dapatkan ringkasan singkat dari artikel ini menggunakan AI.</p>
        </div>
        <input type="hidden" name="articleText" value={articleText} />
        <SubmitButton />
      </form>

      {(state.summary || state.error) && (
        <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem} className="mt-4 w-full">
          <AccordionItem value="summary" className="border-t border-b-0 border-border/50">
             <AccordionTrigger className="pt-4 text-primary hover:no-underline data-[state=closed]:hidden">
                {state.message === 'success' ? 'Lihat Ringkasan' : 'Detail Kesalahan'}
             </AccordionTrigger>
             <AccordionContent className="pt-2">
                {state.message === 'success' && state.summary && (
                    <div className="article-content">{state.summary}</div>
                )}
                {state.error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Gagal Membuat Ringkasan</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                  </Alert>
                )}
             </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
