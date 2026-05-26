import RegisterForm from "../components/auth/RegisterForm";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Register({ onSwitch }) {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            component="img"
            src="/minddrop-logo.png"
            alt="MindDrop"
            sx={{ width: 56, height: "auto", mb: 1.5 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            MindDrop
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Creá tu cuenta para empezar
          </Typography>
        </Box>

        <RegisterForm />

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            ¿Ya tenés cuenta?
          </Typography>
          <Button
            variant="text"
            onClick={onSwitch}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
