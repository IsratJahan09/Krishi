import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const ConnectionTest = () => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const testConnection = async () => {
    setTesting(true);
    const testResults: any = {
      apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
      tests: []
    };

    // Test 1: Check API URL is configured
    testResults.tests.push({
      name: "API URL Configuration",
      status: import.meta.env.VITE_API_URL ? "pass" : "fail",
      message: import.meta.env.VITE_API_URL || "VITE_API_URL not set in .env"
    });

    // Test 2: Test history endpoint
    try {
      console.log('Testing history endpoint...');
      const response = await fetch(`${testResults.apiUrl}/history/`);
      testResults.tests.push({
        name: "History Endpoint",
        status: response.ok ? "pass" : "fail",
        message: response.ok ? `Status: ${response.status}` : `Error: ${response.status}`
      });
    } catch (error: any) {
      testResults.tests.push({
        name: "History Endpoint",
        status: "fail",
        message: `Error: ${error.message}`
      });
    }

    // Test 3: Test CORS
    try {
      console.log('Testing CORS...');
      const response = await fetch(`${testResults.apiUrl}/history/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      testResults.tests.push({
        name: "CORS Configuration",
        status: response.ok ? "pass" : "fail",
        message: response.ok ? "CORS working" : "CORS may be blocked"
      });
    } catch (error: any) {
      testResults.tests.push({
        name: "CORS Configuration",
        status: "fail",
        message: `CORS Error: ${error.message}`
      });
    }

    setResults(testResults);
    setTesting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6">Backend Connection Test</h1>
          
          <div className="space-y-4 mb-6">
            <div>
              <strong>API URL:</strong> {import.meta.env.VITE_API_URL || 'Not configured'}
            </div>
            <div>
              <strong>Frontend URL:</strong> {window.location.origin}
            </div>
          </div>

          <Button 
            onClick={testConnection} 
            disabled={testing}
            size="lg"
            className="mb-6"
          >
            {testing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Testing...
              </>
            ) : (
              "Run Connection Test"
            )}
          </Button>

          {results && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Test Results:</h2>
              
              {results.tests.map((test: any, index: number) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    {test.status === "pass" ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <div className="font-semibold">{test.name}</div>
                      <div className="text-sm text-muted-foreground">{test.message}</div>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Summary:</h3>
                <div>
                  Passed: {results.tests.filter((t: any) => t.status === "pass").length} / {results.tests.length}
                </div>
                
                {results.tests.some((t: any) => t.status === "fail") && (
                  <div className="mt-4 p-3 bg-destructive/10 rounded">
                    <strong>Troubleshooting:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      <li>Make sure backend is running: <code>python manage.py runserver</code></li>
                      <li>Check backend terminal for errors</li>
                      <li>Verify .env has VITE_API_URL=http://localhost:8000/api</li>
                      <li>Restart frontend after .env changes</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ConnectionTest;
