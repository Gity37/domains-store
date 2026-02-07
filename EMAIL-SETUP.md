# Configuración de Email - 100% GRATUITO

El sistema está configurado para usar **tu propia cuenta de Hotmail/Outlook**. No necesitas pagar nada ni registrarte en servicios externos.

## 🎯 Cómo funciona

Tu email (cgleztarin@hotmail.com) se enviará emails a sí mismo con la información de las consultas. Es completamente gratis.

## 🔑 Configuración Rápida (5 minutos)

### Paso 1: Crear una Contraseña de Aplicación

Microsoft no permite usar tu contraseña normal por seguridad. Necesitas crear una "App Password":

1. **Ve a tu cuenta de seguridad de Microsoft**:
   👉 https://account.microsoft.com/security

2. **Habilita la verificación en dos pasos** (si no la tienes):
   - Scroll hasta "Verificación en dos pasos"
   - Click en "Activar la verificación en dos pasos"
   - Sigue las instrucciones (te pedirá tu teléfono)

3. **Crear App Password**:
   - Una vez activada la verificación en dos pasos
   - Busca "Contraseñas de aplicación" o "App passwords"
   - Click en "Crear una nueva contraseña de aplicación"
   - Dale un nombre: "Domains Store"
   - Copia la contraseña generada (formato: `xxxx-xxxx-xxxx-xxxx`)

### Paso 2: Configurar en tu proyecto

1. Abre el archivo `.env.local`
2. Pega tu App Password:

```bash
EMAIL_USER=cgleztarin@hotmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

### Paso 3: ¡Listo!

```bash
npm run dev
```

Prueba el formulario y deberías recibir el email en tu bandeja de entrada.

## ✨ Ventajas de esta solución

- ✅ **100% Gratis** - Sin límites ni costos ocultos
- ✅ **Sin registros** - Usas tu email existente
- ✅ **Sin APIs externas** - Todo bajo tu control
- ✅ **Fácil de configurar** - Solo una App Password
- ✅ **Respuesta directa** - Reply-To configurado al cliente

## 📧 Características del Email

Los emails que recibirás incluyen:
- ✨ Diseño HTML profesional con gradientes
- 📱 Responsive (se ve bien en móvil)
- 🔄 Botón Reply responde directamente al cliente
- 📊 Información completa: nombre, email, teléfono, mensaje
- 🌐 Dominio visitado y dominio de interés
- 📅 Fecha y hora de la consulta

## ⚠️ Troubleshooting

### "Error: Invalid login"
- Verifica que creaste una App Password (no uses tu contraseña normal)
- Asegúrate de que la verificación en dos pasos está activa
- Copia la App Password exactamente como aparece

### "Error: Authentication failed"
- Revisa que EMAIL_USER tiene tu email correcto
- Verifica que EMAIL_PASSWORD no tiene espacios extras
- Reinicia el servidor de desarrollo

### Emails no llegan
- Revisa tu carpeta de spam
- Verifica que el formulario se envió sin errores
- Comprueba los logs del servidor
- Puede tardar 1-2 minutos en llegar

### Gmail en lugar de Hotmail

Si prefieres usar Gmail, cambia en el código `app/api/contact/route.ts`:

```typescript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Gmail App Password
  },
});
```

Y crea una App Password de Gmail:
1. Ve a: https://myaccount.google.com/apppasswords
2. Selecciona "Correo" y "Otro dispositivo"
3. Copia la contraseña generada

## 💰 Límites

**NINGUNO** - Es tu propio correo, puedes enviar tantos emails como quieras (dentro de los límites normales de Outlook: ~300/día).

## 🔒 Seguridad

- ✅ Las credenciales están en `.env.local` (no se suben a Git)
- ✅ Usas App Password (no tu contraseña real)
- ✅ Validación de campos en el formulario
- ✅ Rate limiting opcional (puedes agregar si quieres)
