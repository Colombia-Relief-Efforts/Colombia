# Ayuda a Colombia Ahora

Sitio para amplificar recaudaciones solidarias de grupos comunitarios y
voluntarios que apoyan a personas afectadas por emergencias en Colombia.

**Sitio publicado:** [colombia-relief-efforts.github.io/Colombia](https://colombia-relief-efforts.github.io/Colombia/)

## Primeros pasos

Instala las dependencias y ejecuta el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Contenido

El contenido del sitio se almacena como archivos Markdown en
`content/organizations` y `content/payment-methods`.

Para agregar una organización:

1. Copia el archivo `example.md` correspondiente.
2. Renómbralo con un identificador descriptivo.
3. Completa los metadatos y el contenido.
4. Establece `published: true` cuando esté listo para publicarse.

El nombre del archivo se convierte en la ruta de la organización. Por ejemplo,
`cruz-roja-colombiana.md` estará disponible en `/cruz-roja-colombiana`.

Los metadatos admitidos para una organización son:

- Obligatorio: `name`
- Ubicación: `department`, `city`, `address`, `addressUrl`
- Clasificación: `cause`, `published`, `order`
- Donaciones y acciones: `donationUrl`, `contactUrl`, `contactLabel`, `paymentMethods`, `acceptsCrypto`
- Contacto: `largeDonationsContact`, `websiteUrl`, `instagramUrl`, `facebookUrl`, `twitterUrl`
- Detalles: `spendingTowards`, `accomplishmentsUrl`, `backedBy`
- Imagen: `bannerImage` o `bannerImageUrl`

El cuerpo del archivo Markdown contiene la descripción de la organización. El
contenido publicado se valida durante el desarrollo y la compilación; cualquier
error identifica el archivo y el campo que debe corregirse.

## Verificación

Antes de abrir una solicitud de cambios, ejecuta:

```bash
npm run lint
npm run build
```

## Publicación en GitHub Pages

`npm run build` exporta el sitio estático al directorio `out/`. Cada cambio
integrado en `main` despliega automáticamente ese directorio mediante
`.github/workflows/deploy-pages.yml`.

GitHub Pages está configurado para publicar el sitio en:

`https://colombia-relief-efforts.github.io/Colombia/`

El flujo de publicación utiliza `/Colombia` como ruta base. Las compilaciones
locales utilizan `/` de forma predeterminada. Para probar localmente las rutas
exactas de producción, ejecuta:

```bash
PAGES_BASE_PATH=/Colombia npm run build
```

## Recursos técnicos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de GitHub Pages](https://docs.github.com/es/pages)
