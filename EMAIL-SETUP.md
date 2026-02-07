# Configuración de Email - 100% GRATUITO

⚠️ **Configuración**: Usarás **Gmail para ENVIAR** y los emails llegarán a **tu Hotmail**.

## 🎯 Cómo funciona

- **Gmail** → Cuenta que envía los emails (gratis, funciona perfecto)
- **Hotmail** → Donde recibes los emails (cgleztarin@hotmail.com)
- No necesitas configurar reenvíos ni nada complicado

## 🔑 Configuración (5 minutos)

### Paso 1: Ten una cuenta Gmail

Puedes:
- Usar tu Gmail personal
- O crear uno nuevo solo para esto (ej: `dominios.cglez@gmail.com`)

Esta cuenta solo se usa para ENVIAR, no recibirás emails aquí.

### Paso 2: Habilitar verificación en 2 pasos en Gmail

1. Ve a: **https://myaccount.google.com/security**
2. Scroll hasta "Verificación en dos pasos"
3. Click en "Comenzar" y sigue las instrucciones

### Paso 3: Crear App Password de Gmail

1. Ve a: **https://myaccount.google.com/apppasswords**
2. Si te pide iniciar sesión, hazlo
3. En "Selecciona la app" → Elige **"Correo"**
4. En "Selecciona el dispositivo" → Elige **"Otro"** y escribe "Domains Store"
5. Click en **"Generar"**
6. Copia la contraseña de 16 caracteres (ej: `abcd efgh ijkl mnop`)
   - Quita los espacios: `abcdefghijklmnop`

### Paso 4: Configurar en `.env.local`

Abre el archivo `.env.local` y configura:

```bash
# Gmail que ENVÍA los emails
EMAIL_USER=tu-gmail@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop

# Hotmail donde RECIBES los emails
CONTACT_EMAIL=cgleztarin@hotmail.com
```

### Paso 5: ¡Listo!

```bash
npm run dev
```

Prueba el formulario y revisa tu **Hotmail** (cgleztarin@hotmail.com).

## 📮 Flujo de emails

1. Cliente rellena formulario en tu web
2. Tu **Gmail** envía el email
3. Email llega a tu **Hotmail** (cgleztarin@hotmail.com)
4. Puedes responder directamente al cliente desde Hotmail

## ✨ Ventajas de Gmail

- ✅ **100% Gratis** - Sin límites ocultos
- ✅ **Súper fácil** - App Password en 2 minutos
- ✅ **Funciona siempre** - No como Hotmail que bloquea autenticación básica
- ✅ **Sin registros externos** - Usas tu propio Gmail
- ✅ **500 emails/día** - Límite generoso de Gmail
- ✅ **Respuesta directa** - Reply-To configurado al cliente

## 📧 Características del Email

Los emails incluyen:
- ✨ Diseño HTML profesional con gradientes
- 📱 Responsive (se ve bien en móvil)
- 🔄 Botón Reply responde directamente al cliente
- 📊 Información completa: nombre, email, teléfono, mensaje
- 🌐 Dominio visitado y dominio de interés
- 📅 Fecha y hora de la consulta

## ⚠️ Troubleshooting

### "Error: Invalid login" con Gmail
- Verifica que tienes verificación en 2 pasos ACTIVA
- Crea una App Password en: https://myaccount.google.com/apppasswords
- No uses tu contraseña normal de Gmail
- Copia la App Password sin espacios

### Emails no llegan
- Revisa tu carpeta de spam en Gmail
- Verifica que el formulario se envió sin errores (mira la consola)
- Los emails llegan en segundos con Gmail
- Comprueba que EMAIL_USER y EMAIL_PASSWORD están bien en `.env.local`

### "Error: Authentication unsuccessful" con Hotmail
- ⚠️ Hotmail/Outlook tienen autenticación básica deshabilitada
- **Solución**: Usa Gmail en su lugar
- O habilita SMTP en configuración avanzada de Outlook (complicado)

## 💰 Límites

- **Gmail**: 500 emails/día (más que suficiente)
- **100% Gratis**
- Sin costos ocultos

## 🔒 Seguridad

- ✅ Las credenciales están en `.env.local` (no se suben a Git)
- ✅ Usas App Password (no tu contraseña real)
- ✅ Validación de campos en el formulario
- ✅ Reply-To configurado para privacidad

## 🎯 Resumen rápido

1. Crea/usa cuenta Gmail
2. Activa verificación en 2 pasos: https://myaccount.google.com/security
3. Crea App Password: https://myaccount.google.com/apppasswords
4. Pega en `.env.local`:
   ```bash
   EMAIL_USER=tu-gmail@gmail.com
   EMAIL_PASSWORD=tu-app-password-sin-espacios
   ```
5. `npm run dev`
6. ¡Listo!
