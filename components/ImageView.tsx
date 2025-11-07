import React, { useState, ChangeEvent, useCallback } from 'react';
import { analyzeImageWithPrompt } from '../services/geminiService';
import Button from './ui/Button';
import Card from './ui/Card';
import Loader from './ui/Loader';

const ImageView: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('Describe this image in detail.');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResult('');
      setError('');
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (!image || !prompt) {
      setError('Please select an image and provide a prompt.');
      return;
    }
    setIsLoading(true);
    setResult('');
    setError('');
    try {
        const base64Image = await fileToBase64(image);
        const response = await analyzeImageWithPrompt(base64Image, image.type, prompt);
        setResult(response.text);
    } catch (e) {
        setError('An error occurred during analysis. Please try again.');
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
        <h1 className="text-3xl font-bold text-text mb-2">Vision Agent</h1>
        <p className="text-text-secondary mb-6">Upload an image and ask Gemini to analyze it.</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
            <div className="flex flex-col space-y-4">
                <Card>
                    <label htmlFor="file-upload" className="block text-sm font-medium text-text-secondary mb-2">Upload Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="mx-auto h-48 w-auto rounded-md" />
                            ) : (
                                <svg className="mx-auto h-12 w-12 text-text-secondary" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                            <div className="flex text-sm text-text-secondary">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-surface rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-background focus-within:ring-primary p-1">
                                    <span>{image ? 'Change file' : 'Upload a file'}</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-text-secondary">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </Card>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="w-full bg-secondary border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your prompt..."
                />
                <Button onClick={handleSubmit} disabled={isLoading || !image} fullWidth>
                    {isLoading ? 'Analyzing...' : 'Analyze Image'}
                </Button>
            </div>
            <Card>
                {isLoading && <Loader text="Analyzing image..." />}
                {error && <p className="text-red-400">{error}</p>}
                {result && <pre className="whitespace-pre-wrap font-sans text-text">{result}</pre>}
                 {!isLoading && !result && !error && (
                    <div className="text-center text-text-secondary py-16">
                        <h3 className="text-lg font-semibold">Analysis results will appear here.</h3>
                    </div>
                 )}
            </Card>
        </div>
    </div>
  );
};

export default ImageView;