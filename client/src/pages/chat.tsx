import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sql?: string;
  results?: Array<Record<string, any>>;
}

// todo: remove mock functionality
const mockSampleQuestions = [
  "What's the total spend in the last 90 days?",
  "List top 5 vendors by spend",
  "Show overdue invoices as of today",
  "What's the average invoice value by vendor?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    // todo: remove mock functionality - Mock AI response
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "Based on your query, here's what I found:",
      sql: "SELECT vendor_name, SUM(invoice_total) as total_spend FROM invoices GROUP BY vendor_name ORDER BY total_spend DESC LIMIT 5;",
      results: [
        { vendor: "Phorix GmbH", total_spend: 736784.02 },
        { vendor: "Amazon", total_spend: 580000.00 },
        { vendor: "Two Inflow", total_spend: 520000.00 },
      ],
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-3xl font-semibold mb-2">Chat with Data</h1>
        <p className="text-sm text-muted-foreground">
          Ask questions about your invoice data using natural language
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Ask me anything about your data</h2>
              <p className="text-muted-foreground">
                Try asking questions like these:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
              {mockSampleQuestions.map((question, index) => (
                <Card
                  key={index}
                  className="hover-elevate cursor-pointer"
                  onClick={() => handleSampleQuestion(question)}
                  data-testid={`card-sample-question-${index}`}
                >
                  <CardContent className="p-4">
                    <p className="text-sm">{question}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div className={`flex-1 ${message.role === "user" ? "max-w-md" : "max-w-2xl"}`}>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm">{message.content}</p>
                      {message.sql && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-medium text-muted-foreground uppercase">
                            Generated SQL
                          </p>
                          <pre className="bg-muted p-3 rounded-md text-xs font-mono overflow-x-auto">
                            {message.sql}
                          </pre>
                        </div>
                      )}
                      {message.results && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-medium text-muted-foreground uppercase">
                            Results
                          </p>
                          <div className="rounded-md border overflow-hidden">
                            <table className="w-full text-sm">
                              <thead className="bg-muted/50">
                                <tr>
                                  {Object.keys(message.results[0]).map((key) => (
                                    <th key={key} className="px-3 py-2 text-left text-xs font-medium uppercase">
                                      {key.replace(/_/g, " ")}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y">
                                {message.results.map((row, idx) => (
                                  <tr key={idx}>
                                    {Object.values(row).map((value, vidx) => (
                                      <td key={vidx} className="px-3 py-2 font-mono">
                                        {typeof value === "number"
                                          ? `€${value.toLocaleString()}`
                                          : value}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 border-t">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            placeholder="Ask a question about your data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            data-testid="input-chat-message"
          />
          <Button onClick={handleSend} data-testid="button-send-message">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
