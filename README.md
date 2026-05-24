# 💅 Lumière Beauty Studio — Guía Completa

> Web moderna y premium para salón de belleza femenino  
> Next.js 14 · TailwindCSS · Framer Motion · Supabase

---

## 📁 Estructura del Proyecto

```
beauty-salon/
├── app/
│   ├── admin/
│   │   └── page.tsx              ← Panel administrador
│   ├── api/
│   │   ├── appointments/
│   │   │   ├── route.ts          ← API citas (GET/POST)
│   │   │   └── [id]/route.ts     ← API cita individual (PATCH)
│   │   ├── instagram/
│   │   │   └── route.ts          ← API Instagram
│   │   └── services/
│   │       └── route.ts          ← API servicios
│   ├── globals.css               ← Estilos globales + fuentes
│   ├── layout.tsx                ← Layout raíz + SEO
│   └── page.tsx                  ← Página principal
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx            ← Barra de navegación
│   │   ├── Hero.tsx              ← Sección principal
│   │   ├── Services.tsx          ← Servicios con botón WhatsApp
│   │   ├── About.tsx             ← Sobre nosotras
│   │   ├── Gallery.tsx           ← Galería conectada a Instagram
│   │   ├── Reviews.tsx           ← Opiniones de clientes
│   │   ├── Booking.tsx           ← Sistema de citas con calendario
│   │   ├── Contact.tsx           ← Contacto + formulario
│   │   └── Footer.tsx            ← Pie de página
│   └── ui/
│       └── WhatsAppFloat.tsx     ← Botón flotante WhatsApp
├── lib/
│   ├── supabase.ts               ← Cliente Supabase
│   └── utils.ts                  ← Funciones utilitarias
├── supabase/
│   └── migrations/
│       └── 001_initial.sql       ← Schema de base de datos
├── public/
│   └── images/                   ← Imágenes del salón
├── .env.local                    ← Variables de entorno
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 🚀 PASO 1 — Instalación Local

### Requisitos
- Node.js 18+ → Descárgalo en https://nodejs.org
- Git → Descárgalo en https://git-scm.com

### Instalación paso a paso

```bash
# 1. Abre la terminal (PowerShell o Terminal en Mac)

# 2. Navega a la carpeta donde descargaste el proyecto
cd ruta/a/beauty-salon

# 3. Instala todas las dependencias
npm install

# 4. Copia el archivo de variables de entorno
# (ya está creado como .env.local, solo edítalo)

# 5. Inicia el servidor de desarrollo
npm run dev

# 6. Abre tu navegador en:
# http://localhost:3000
```

¡La web ya corre! 🎉 (sin Instagram ni Supabase conectados aún)

---

## 🗄️ PASO 2 — Conectar Supabase (Base de Datos)

### Qué es Supabase
Es la base de datos de tu salón. Aquí se guardan las **citas** que hacen las clientas.

### Pasos:

#### A) Crear cuenta y proyecto
1. Ve a https://supabase.com
2. Clic en "Start your project" → Crea cuenta con Google
3. Clic en "New Project"
4. Nombre: `beauty-salon` · Contraseña: créala fuerte · Región: `South America (São Paulo)`
5. Espera ~2 minutos mientras se crea

#### B) Crear las tablas
1. En el menú izquierdo clic en **SQL Editor**
2. Clic en **New query**
3. Copia todo el contenido de `supabase/migrations/001_initial.sql`
4. Pégalo en el editor
5. Clic en **Run** (o Ctrl+Enter)
6. ¡Listo! Las tablas están creadas ✓

#### C) Obtener las credenciales
1. En menú izquierdo → **Settings** → **API**
2. Copia estos valores:
   - **Project URL** → esto va en `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** (en "Project API Keys") → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** (más abajo, clic en "Reveal") → `SUPABASE_SERVICE_ROLE_KEY`

#### D) Agregar al .env.local
```env
NEXT_PUBLIC_SUPABASE_URL=https://XXXXXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...
```

---

## 📸 PASO 3 — Conectar Instagram (Galería Automática)

### Qué necesitas
- Cuenta de Instagram Business o Creator
- Página de Facebook conectada a ese Instagram

### Pasos detallados:

#### A) Crear App en Meta (Facebook)
1. Ve a https://developers.facebook.com
2. Clic en **My Apps** → **Create App**
3. Tipo: **Business** → Siguiente
4. Nombre: `lumiere-beauty-app` → Clic en **Create App**

#### B) Agregar Instagram Basic Display
1. En tu app → **Add Product** → busca "Instagram Basic Display" → **Set Up**
2. En el menú → **Instagram Basic Display** → **Basic Display**
3. Clic en **Create New App**

#### C) Obtener tu User ID y Token
1. En **User Token Generator** → clic en **Add or Remove Instagram Testers**
2. Agrega tu cuenta de Instagram como tester
3. Ve a Instagram → Configuración → Apps y sitios web → **Aceptar** la invitación
4. Regresa a Meta → genera el **User Token**
5. Copia el **Instagram User ID** y el **Access Token**

#### D) Hacer el token de larga duración (dura 60 días, renueva automático)
```bash
# Reemplaza los valores y abre esta URL en el navegador:
https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=TU_APP_SECRET&access_token=TU_SHORT_TOKEN
```

#### E) Agregar al .env.local
```env
INSTAGRAM_ACCESS_TOKEN=IGAAxxxxxxxxxxxxxxx
INSTAGRAM_USER_ID=17841400000000000
```

#### F) Renovación automática del token (cada 60 días)
Crea un cron job en Vercel (o usa GitHub Actions) para llamar:
```
https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TU_TOKEN
```

---

## 💬 PASO 4 — Configurar WhatsApp

Es el más fácil:

```env
# En .env.local, cambia estos valores:
NEXT_PUBLIC_WHATSAPP_NUMBER=50300000000
# ↑ Número SIN espacios NI signos (+). Ejemplo El Salvador: 50370000000

NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola! Me gustaría reservar una cita 💅
```

El número debe incluir el código de país:
- El Salvador: `503` + número → `50370000000`
- México: `52` + número → `5215000000000`
- Colombia: `57` + número → `573000000000`

---

## 🌐 PASO 5 — Publicar en Vercel (Gratis)

### Qué es Vercel
Es el lugar donde vive tu web. Es gratis para sitios pequeños.

### Pasos:

#### A) Subir código a GitHub
```bash
# En la terminal, dentro de tu carpeta:
git init
git add .
git commit -m "Mi salón de belleza 💅"

# Crea un repositorio en https://github.com/new
# Luego conecta:
git remote add origin https://github.com/TU-USUARIO/beauty-salon.git
git push -u origin main
```

#### B) Conectar con Vercel
1. Ve a https://vercel.com
2. Clic en **Sign Up** → usa tu cuenta de GitHub
3. Clic en **New Project**
4. Selecciona tu repositorio `beauty-salon`
5. Clic en **Deploy** → espera ~2 minutos

#### C) Agregar variables de entorno en Vercel
1. Ve a tu proyecto → **Settings** → **Environment Variables**
2. Agrega UNA POR UNA todas las variables de tu `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   INSTAGRAM_ACCESS_TOKEN
   INSTAGRAM_USER_ID
   NEXT_PUBLIC_WHATSAPP_NUMBER
   NEXT_PUBLIC_WHATSAPP_MESSAGE
   NEXT_PUBLIC_SALON_NAME
   NEXT_PUBLIC_SALON_ADDRESS
   NEXT_PUBLIC_SALON_PHONE
   NEXT_PUBLIC_SALON_EMAIL
   NEXT_PUBLIC_SALON_IG
   ```
3. Clic en **Save** → luego **Redeploy**

#### D) Tu dominio gratuito
Vercel te da automáticamente:
```
https://beauty-salon-XXXXX.vercel.app
```

Para dominio personalizado (ej: `lumiere.com`):
1. Compra el dominio en Namecheap o GoDaddy
2. En Vercel → **Settings** → **Domains** → agrega tu dominio
3. Sigue las instrucciones de DNS

---

## 🔄 PASO 6 — Actualizaciones Automáticas

Cada vez que hagas cambios:

```bash
# 1. Guarda tus cambios
git add .
git commit -m "Descripción del cambio"
git push

# ¡Vercel despliega automáticamente en ~1 minuto! 🚀
```

---

## 👩‍💼 PASO 7 — Panel Administrador

Accede en:
```
https://TU-WEB.vercel.app/admin
```

**PIN por defecto:** `1234`

⚠️ **IMPORTANTE:** Cambia el PIN en `app/admin/page.tsx`:
```typescript
const ADMIN_PIN = "1234"; // ← Cámbialo por algo seguro
```

En el panel puedes:
- ✅ Ver todas las citas
- ✅ Confirmar o cancelar citas
- ✅ Agregar nuevos servicios
- ✅ Ver estadísticas básicas

---

## 🖼️ PASO 8 — Agregar tus Fotos

Reemplaza los placeholders en el código:

### Hero (foto principal)
En `components/sections/Hero.tsx`, busca el comentario:
```tsx
{/* Replace the div above with a real Image tag like:
    <Image src="/images/hero-main.jpg" alt="Servicio premium" fill className="object-cover" />
*/}
```
Elimina el `<div>` de placeholder y descomenta el `<Image>`.

### Fotos del salón
Coloca tus imágenes en:
```
public/images/hero-main.jpg    ← Foto principal hero
public/images/about.jpg        ← Foto del equipo
public/images/og-image.jpg     ← Preview para redes (1200x630px)
```

---

## ✅ Checklist Final

Antes de publicar, verifica:

- [ ] Nombre del salón en `.env.local`
- [ ] Número de WhatsApp configurado
- [ ] Dirección y teléfono configurados
- [ ] Fotos reales cargadas en `public/images/`
- [ ] Instagram conectado (galería automática)
- [ ] Supabase con tablas creadas
- [ ] PIN del admin cambiado
- [ ] Variables en Vercel cargadas
- [ ] Dominio personalizado (opcional)

---

## 🆘 Problemas Comunes

| Problema | Solución |
|----------|----------|
| `npm install` falla | Asegúrate de tener Node 18+ instalado |
| La web no carga | Revisa que el `.env.local` esté correcto |
| Instagram no muestra fotos | Verifica el token y que no esté vencido |
| Las citas no se guardan | Revisa las credenciales de Supabase |
| Vercel falla en deploy | Revisa el log de errores en Vercel Dashboard |

---

## 📞 Flujo Completo del Cliente

```
Instagram → Ve posts del salón
    ↓
Visita la Web → Ve servicios y galería
    ↓
Sistema de Citas → Escoge servicio, fecha y hora
    ↓
WhatsApp → Confirmación automática
    ↓
¡Cita reservada! 💅
```

---

Hecho con 💕 para Lumière Beauty Studio
