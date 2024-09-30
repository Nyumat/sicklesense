'use client';

import { experimental_useObject as useObject } from 'ai/react';
import { useState } from 'react';
import { z } from 'zod';
const questionsSchema = z.array(z.object({ id: z.string(), question: z.string() }));

export default function Page() {
    const [input, setInput] = useState('');
    const { object, submit } = useObject({
        api: '/api/questions',
        schema: z.object({ questions: questionsSchema }),
    });

    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={() => submit(input)}>Submit</button>
            <div className="grid grid-cols-2 gap-4">
                {object?.questions?.map((question) => (
                    <div key={question?.id} className="p-4 border border-gray-200 rounded">
                        <h3 className="font-bold">{question?.question}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}