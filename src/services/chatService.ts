import type { Message } from "../types"

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY

const PREPROMPT_MESSAGE: Message = {
  role: 'system',
  content: 'Ты спец по машинам, отвечай дружелюбно, при простом приветствии укажи что ты специализируешься на автомобилях',
  timestamp: new Date()
}

export const sendMessageToAI = async (messages: Message[]): Promise<Message> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [PREPROMPT_MESSAGE, ...messages],
      }),
    })

    const data = await response.json()
    console.log(data)

    if (data.choices && data.choices.length > 0) {
      return {
        content: data.choices[0].message.content,
        timestamp: new Date(),
        role: 'assistant'
      }
    } else {
      throw new Error('ИИ не отвечает...')
    }
  } catch (error) {
    throw new Error('Не удалось подключиться к API 🙂‍↕️')
  }
}