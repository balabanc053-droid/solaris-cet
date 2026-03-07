import { pipeline, env } from '@xenova/transformers';

// Configurare pentru performanță maximă pe resurse puține
env.allowLocalModels = false;
env.useBrowserCache = true;

let chatbot;

self.onmessage = async (e) => {
    const { text } = e.data;

    if (!chatbot) {
        // Încărcare model cuantizat (4-bit) pentru a salva RAM
        chatbot = await pipeline('text-generation', 'Xenova/TinyLlama-1.1B-Chat-v1.0', {
            progress_callback: (p) => {
                self.postMessage({ status: 'progress', progress: p });
            }
        });
    }

    const output = await chatbot(text, {
        max_new_tokens: 256,
        temperature: 0.7,
        callback_function: (beams) => {
            self.postMessage({ status: 'update', output: beams[0].output_text });
        }
    });

    self.postMessage({ status: 'complete', output });
};
