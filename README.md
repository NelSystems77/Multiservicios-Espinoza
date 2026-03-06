# Destaqueos 24 Horas - PWA

Progressive Web App (PWA) profesional para Multiservicios Espinoza - Servicios de plomería, destaqueos y mantenimiento disponibles 24/7.

## 🚀 Características

### Funcionalidades Principales
- ✅ **Navegación Intuitiva**: Interfaz de usuario moderna y fácil de usar
- ✅ **Solicitud de Cotizaciones**: Formulario inteligente que se adapta al servicio seleccionado
- ✅ **Integración WhatsApp**: Envío directo de solicitudes via WhatsApp Deep Link
- ✅ **Formularios Dinámicos**: Campos específicos para cada tipo de servicio
- ✅ **Responsive Design**: Optimizado para móviles, tablets y desktop
- ✅ **PWA Completa**: Instalable en dispositivos móviles y desktop
- ✅ **Modo Offline**: Funcionalidad básica sin conexión a internet

### Servicios Incluidos
1. Destaque de Tuberías y Pilas Fluviales
2. Localización de Tuberías y Daños
3. Fontanería, Cloacas y Desagües
4. Limpieza de Tanques Sépticos (con campos especializados)
5. Lavado a Presión con Hidrolavadora
6. Servicio de Tuboscopia
7. Otros Servicios (personalizables)

### Características Técnicas
- **PWA**: Service Worker para caché y modo offline
- **Responsive**: Mobile-first design
- **Rápida**: Optimizada para carga rápida
- **Accesible**: Cumple estándares de accesibilidad
- **SEO**: Optimizada para motores de búsqueda

## 📁 Estructura del Proyecto

```
destaqueos-24h/
├── index.html              # Página principal HTML
├── styles.css              # Estilos CSS
├── app.js                  # Lógica JavaScript
├── service-worker.js       # Service Worker para PWA
├── manifest.json           # Configuración PWA
├── icons/                  # Iconos de la aplicación
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
├── generate_icons.py       # Script generador de iconos
└── README.md              # Este archivo
```

## 🛠️ Instalación y Despliegue

### Opción 1: Servidor Local (Desarrollo)

1. Asegúrate de tener Python instalado:
```bash
python3 --version
```

2. Inicia un servidor local:
```bash
cd destaqueos-24h
python3 -m http.server 8000
```

3. Abre tu navegador en:
```
http://localhost:8000
```

### Opción 2: Despliegue en Hosting

#### Netlify (Recomendado)

1. Crea una cuenta en [Netlify](https://www.netlify.com)
2. Arrastra la carpeta del proyecto a Netlify Drop
3. Tu sitio estará disponible en `https://tu-sitio.netlify.app`

#### Vercel

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Despliega:
```bash
cd destaqueos-24h
vercel
```

#### GitHub Pages

1. Crea un repositorio en GitHub
2. Sube todos los archivos
3. Activa GitHub Pages en Settings > Pages
4. Selecciona la rama main y carpeta root

#### Hosting Tradicional (cPanel, etc.)

1. Sube todos los archivos vía FTP
2. Asegúrate de que todos los archivos estén en la raíz o en un subdirectorio
3. Configura el dominio para apuntar a la carpeta

### Opción 3: Firebase Hosting

1. Instala Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Inicializa Firebase:
```bash
firebase init hosting
```

3. Despliega:
```bash
firebase deploy
```

## 📱 Instalación como App

### En Android
1. Abre la PWA en Chrome
2. Toca el menú (tres puntos)
3. Selecciona "Agregar a pantalla de inicio"
4. Confirma la instalación

### En iOS (iPhone/iPad)
1. Abre la PWA en Safari
2. Toca el botón de compartir
3. Selecciona "Agregar a pantalla de inicio"
4. Confirma

### En Desktop (Chrome, Edge)
1. Abre la PWA en el navegador
2. Busca el ícono de instalación en la barra de direcciones
3. Haz clic en "Instalar"

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-blue: #1e3a8a;        /* Color principal */
    --accent-red: #dc2626;          /* Color de acento */
    --accent-yellow: #fbbf24;       /* Color de resaltado */
}
```

### Modificar Contenido

- **Servicios**: Edita la sección de servicios en `index.html`
- **Información de contacto**: Actualiza los datos en la sección de contacto
- **Número de WhatsApp**: Cambia el número en `app.js` y en los enlaces de `index.html`

### Cambiar Iconos

1. Edita `generate_icons.py` para cambiar el diseño
2. Ejecuta:
```bash
python3 generate_icons.py
```

## 🔧 Configuración

### WhatsApp

El número de WhatsApp actual es: **+506 8650-4644**

Para cambiar el número:

1. Busca en `app.js`:
```javascript
const whatsappURL = `https://wa.me/50686504644?text=${encodedMessage}`;
```

2. Reemplaza con tu número (formato: código país + número sin espacios ni guiones)

### Enlaces de Facebook

Actualiza el enlace en la sección de contacto de `index.html`:
```html
<a href="https://www.facebook.com/tu-pagina" ...>
```

## 📊 SEO y Analytics

### Google Analytics

Agrega antes de `</head>` en `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU-ID');
</script>
```

### Meta Tags SEO

Ya incluidos en `index.html`:
- Título y descripción
- Open Graph para redes sociales
- Meta tags para PWA

## 🚀 Optimización

### Rendimiento
- ✅ Lazy loading de imágenes
- ✅ Service Worker para caché
- ✅ CSS y JS minificados (producción)
- ✅ Fuentes optimizadas

### Accesibilidad
- ✅ Etiquetas semánticas HTML5
- ✅ ARIA labels
- ✅ Contraste de colores adecuado
- ✅ Navegación por teclado

## 🐛 Solución de Problemas

### La PWA no se instala
- Verifica que estés usando HTTPS (excepto localhost)
- Asegúrate de que el manifest.json sea accesible
- Revisa la consola del navegador para errores

### El Service Worker no funciona
- Limpia el caché del navegador
- Verifica que service-worker.js esté en la raíz
- Revisa la pestaña Application > Service Workers en DevTools

### Los iconos no aparecen
- Verifica que la carpeta `icons/` exista
- Regenera los iconos con `python3 generate_icons.py`
- Limpia el caché y reinstala la PWA

## 📝 Licencia

Proyecto desarrollado para Multiservicios Espinoza - Destaqueos 24 Horas

## 🤝 Soporte

Para soporte técnico o consultas:
- **WhatsApp**: +506 8650-4644 / +506 7105-5885
- **Email**: edestaqueo24horas.sa@gmail.com
- **Facebook**: Destaqueos 24 Horas

---

**Versión**: 1.0.0  
**Última actualización**: Marzo 2024  
**Desarrollado con**: HTML5, CSS3, JavaScript (Vanilla)
