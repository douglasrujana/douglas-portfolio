# 🔧 Variables de Entorno - Telegram Bot

## 📋 Variables Requeridas

### TELEGRAM_BOT_TOKEN (Requerido)
Token del bot de Telegram obtenido de @BotFather

```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
```

### GEMINI_API_KEY (Requerido)
API Key de Google Gemini para respuestas con IA

```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

## 📋 Variables Opcionales

### CV_PDF_URL (Opcional)
URL pública del CV en formato PDF

**Opciones:**

#### 1. Dejar vacío (Desarrollo)
```env
# CV_PDF_URL=
```
- ✅ Bot funciona sin enviar PDF
- ✅ Solo envía texto con información
- ✅ Ideal para testing

#### 2. URL Mock (Testing)
```env
CV_PDF_URL=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf
```
- ✅ PDF de prueba público
- ✅ Verifica que el envío funciona
- ✅ No necesitas subir tu CV aún

#### 3. Google Drive (Producción)
```env
CV_PDF_URL=https://drive.google.com/uc?export=download&id=TU_FILE_ID
```

**Cómo obtener el link:**
1. Sube tu CV a Google Drive
2. Click derecho → Compartir → Cualquiera con el enlace
3. Copiar enlace
4. Cambiar formato: `https://drive.google.com/file/d/FILE_ID/view` → `https://drive.google.com/uc?export=download&id=FILE_ID`

#### 4. Dropbox (Producción)
```env
CV_PDF_URL=https://www.dropbox.com/s/XXXXX/cv.pdf?dl=1
```

**Nota:** Cambiar `?dl=0` por `?dl=1` al final

#### 5. GitHub (Producción)
```env
CV_PDF_URL=https://raw.githubusercontent.com/tu-usuario/tu-repo/main/public/cv.pdf
```

#### 6. Tu Hosting (Producción)
```env
CV_PDF_URL=https://tu-dominio.com/cv.pdf
```

---

### CALENDLY_URL (Opcional)
URL de tu calendario de Calendly

```env
CALENDLY_URL=https://calendly.com/tu-usuario/30min
```

**Si no se configura:** Usa URL por defecto

---

## 🎯 Configuración Recomendada por Entorno

### Desarrollo Local
```env
TELEGRAM_BOT_TOKEN=tu_token_aqui
GEMINI_API_KEY=tu_key_aqui
ENABLE_TELEGRAM=true

# Opcional - Dejar vacío para testing sin PDF
# CV_PDF_URL=
# CALENDLY_URL=
```

### Testing
```env
TELEGRAM_BOT_TOKEN=tu_token_aqui
GEMINI_API_KEY=tu_key_aqui
ENABLE_TELEGRAM=true

# URL Mock para verificar que funciona
CV_PDF_URL=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf
CALENDLY_URL=https://calendly.com/tu-usuario/30min
```

### Producción
```env
TELEGRAM_BOT_TOKEN=tu_token_aqui
GEMINI_API_KEY=tu_key_aqui
ENABLE_TELEGRAM=true

# URLs reales
CV_PDF_URL=https://tu-dominio.com/cv-douglas-rujana.pdf
CALENDLY_URL=https://calendly.com/douglas/30min
```

---

## 🔒 Seguridad

### ⚠️ NUNCA:
- ❌ Subir `.env` a GitHub
- ❌ Compartir tokens públicamente
- ❌ Hardcodear URLs en el código

### ✅ SIEMPRE:
- ✅ Usar variables de entorno
- ✅ Agregar `.env` al `.gitignore`
- ✅ Usar `.env.example` como template
- ✅ Rotar tokens si se comprometen

---

## 🧪 Verificar Configuración

```bash
# Ver si las variables están cargadas
npm run bot:telegram
```

Deberías ver:
```
🔧 Environment Configuration:
  • Features:
    - Telegram: ✅
```

---

## 🐛 Troubleshooting

### Error: "TELEGRAM_BOT_TOKEN is not configured"
**Solución:** Verifica que `.env` tenga el token

### Error: "400 Bad Request: failed to get HTTP URL content"
**Causa:** URL del PDF inválida o no accesible

**Soluciones:**
1. Deja `CV_PDF_URL` vacío (bot funciona sin PDF)
2. Usa URL mock para testing
3. Verifica que tu URL sea pública y accesible

### Bot no envía PDF
**Checklist:**
- [ ] ¿`CV_PDF_URL` está configurado?
- [ ] ¿La URL es pública?
- [ ] ¿El archivo existe?
- [ ] ¿Es un PDF válido?

**Test rápido:**
```bash
# Verificar que la URL funciona
curl -I $CV_PDF_URL
```

---

## 📚 Recursos

- **Obtener Gemini API Key:** https://aistudio.google.com/app/apikey
- **Crear Bot de Telegram:** Busca @BotFather en Telegram
- **Calendly:** https://calendly.com

---

**¿Dudas?** Revisa `START_HERE.md` o `TELEGRAM_BOT_README.md`
