import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Container,
  TextField,
  Button,
  Box,
  Link,
  Typography,
} from "@mui/material";

export default function SigninPage() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const dummyEmail = "test@example.com";
    const dummyPassword = "password123";

    if (email === dummyEmail && password === dummyPassword) {
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don&apos;t have an account? <Link href="/auth/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
