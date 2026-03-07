import React, { useState, useEffect } from 'react';

// Declarație pentru Transformers.js
declare global {
  interface Window {
    transformers?: any;
  }
}

interface AppState {
  input: string;
  response: string;
  loading: boolean;
  modelReady: boolean;
  error: string;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    input: '',
    response: '🔄 Inițializare aplicație...',
    loading: false,
    modelReady: false,
    error: ''
  });

  const [generator, setGenerator] = useState<any>(null);

  // Încarcă modelul AI
  useEffect(() => {
    const loadModel = async () => {
      try {
        if (!window.transformers) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js';
          script.async = true;
          
          script.onload = async () => {
            try {
              const { pipeline } = window.transformers;
              
              setState(prev => ({ ...prev, response: '🔄 Se încarcă modelul AI (~60MB)...' }));
              
              const gen = await pipeline(
                'text-generation', 
                'Xenova/TinyLlama-1.1B-Chat-v1.0',
                { quantized: true }
              );
              
              setGenerator(() => gen);
              setState(prev => ({ 
                ...prev, 
                modelReady: true, 
                response: '✅ Modelul AI este gata! Scrie ceva mai jos.' 
              }));
            } catch (err: any) {
              setState(prev => ({ 
                ...prev, 
                error: 'Eroare la încărcarea modelului: ' + err.message 
              }));
            }
          };
          
          script.onerror = () => {
            setState(prev => ({ 
              ...prev, 
              error: 'Nu s-a putut încărca biblioteca AI.' 
            }));
          };
          
          document.head.appendChild(script);
        }
      } catch (err: any) {
        setState(prev => ({ 
          ...prev, 
          error: 'Eroare inițializare: ' + err.message 
        }));
      }
    };
    
    loadModel();
  }, []);

  const handleGenerate = async () => {
    if (!state.input.trim() || !state.modelReady || !generator) return;

    setState(prev => ({ 
      ...prev, 
      loading: true, 
      response: '⏳ Generare răspuns...', 
      error: '' 
    }));
    
    try {
      const userMessage = state.input.trim();
      
      const prompt = `<|system|>
You are a helpful AI assistant specializing in renewable energy, solar panels, and green technology. Answer in Romanian.
<|user|>
${userMessage}
<|assistant|>`;
      
      const output = await generator(prompt, {
        max_new_tokens: 300,
        temperature: 0.7,
        repetition_penalty: 1.1,
        return_full_text: false
      });
      
      let generatedText = output[0]?.generated_text || 'Nu am putut genera un răspuns.';
      generatedText = generatedText.replace(/<\|.*?\|>/g, '').trim();
      
      setState(prev => ({ 
        ...prev, 
        response: generatedText,
        input: ''
      }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        error: 'Eroare: ' + err.message 
      }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const { input, response, loading, modelReady, error } = state;

  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'system-ui, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f5f7fa'
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '40px', 
        padding: '30px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        borderRadius: '15px'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5em' }}>🌞 Solaris-CET</h1>
        <p style={{ margin: 0, fontSize: '1.2em' }}>
          Asistent AI pentru Energie Verde și Panouri Solare
        </p>
        <small style={{ display: 'block', marginTop: '10px', opacity: 0.8 }}>
          💯 Rulează 100% gratuit în browser • Fără API • Fără server
        </small>
      </header>

      {error && (
        <div style={{ 
          backgroundColor: '#fee', 
          color: '#c33', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px'
        }}>
          <strong>⚠️ Eroare:</strong> {error}
        </div>
      )}

      <div style={{ 
        backgroundColor: 'white', 
        padding: '25px', 
        borderRadius: '12px', 
        marginBottom: '20px', 
        minHeight: '200px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <div style={{ 
          whiteSpace: 'pre-wrap', 
          lineHeight: '1.8', 
          color: '#333',
          fontSize: '1.1em'
        }}>
          {response}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <textarea
          value={input}
          onChange={(e) => setState(prev => ({ ...prev, input: e.target.value }))}
          onKeyPress={handleKeyPress}
          placeholder="Întreabă despre panouri solare, energie regenerabilă..."
          disabled={!modelReady || loading}
          style={{
            flex: 1,
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid #ddd',
            fontSize: '16px',
            minHeight: '80px'
          }}
        />
        <button
          onClick={handleGenerate}
          disabled={!modelReady || loading || !input.trim()}
          style={{
            padding: '15px 30px',
            backgroundColor: (!modelReady || loading) ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: (!modelReady || loading) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '⏳' : modelReady ? 'Trimite' : 'Se încarcă...'}
        </button>
      </div>

      <footer style={{ 
        marginTop: '40px', 
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>Model: TinyLlama 1.1B • Bibliotecă: Transformers.js</p>
        <a href="https://github.com/aamclaudiu-hash/solaris-cet" style={{ color: '#667eea' }}>
          GitHub Repository
        </a>
      </footer>
    </div>
  );
};

export default App;
