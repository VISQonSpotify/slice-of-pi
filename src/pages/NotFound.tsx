
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/bb6cb286-a393-4001-a185-df803348acda.png" 
              alt="Slice of Pi Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Looks like this slice of pi doesn't exist!
          </p>
          <Button 
            onClick={() => navigate("/")}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
