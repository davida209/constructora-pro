# Constructora Pro

Sitio de una constructora de muestra con portafolio conceptual, estimación de costos y un portal interactivo para seguir etapas de obra.

Demo de portafolio de **Lester David Uicab Gongora**. Reconstrucción independiente, desarrollada con Vite, JavaScript, HTML y CSS.

## Funcionalidades

- Servicios y portafolio filtrable de obras conceptuales.
- Cotizador por tipo de obra, superficie, acabados y paquete sustentable.
- Desglose de costo base, opción sustentable, IVA ilustrativo y plazo.
- Estimaciones guardadas y creación de seguimiento de proyectos.
- Avance y retroceso entre seis etapas con porcentaje persistente.

## Ejecutar

Requiere Node.js 22.12 o superior. Abre una terminal en esta carpeta:

```bash
npm ci
npm run dev
```

## Validar y compilar

```bash
npm test
npm run build
npm run preview
```

Las pruebas de Node.js validan la lógica del dominio. GitHub Actions ejecuta instalación, pruebas y compilación en pull requests y cambios de main/develop.

## Recorrido de prueba

1. En Cotizador, prueba 120 m² y cambia entre acabados.
2. Activa el paquete sustentable y revisa el desglose.
3. Guarda la estimación y abre Portal demo.
4. Crea un seguimiento desde la estimación.
5. Avanza hasta Entrega y recarga: se conserva el estado.

## Persistencia y alcance

Las tarifas, plazos y proyectos son ficticios. No es una cotización comercial ni una herramienta de cálculo profesional. El avance es una simulación controlada por el visitante.

Los datos se guardan en localStorage bajo la clave `les-construction-v1`. No hay servidor, cuentas reales ni sincronización entre dispositivos. Para reiniciar la demo, utiliza Reiniciar demo en el pie de página y confirma el restablecimiento. Utiliza datos ficticios y evita documentos sensibles.

## Estructura

```text
src/main.js       Interfaz y eventos
src/model.js      Catálogo y reglas del dominio
src/utils.js      Almacenamiento, diálogos y utilidades
src/style.css     Estilos y diseño adaptable
public/           Recursos estáticos
tests/            Pruebas de lógica
vercel.json       Compilación y reescritura de rutas
```

Cada carpeta es autosuficiente. No importa archivos de los otros proyectos. Puedes modificar datos y reglas en model.js, la interfaz en main.js y el diseño en style.css.

## Git y despliegue

Sube solamente esta carpeta a su propio repositorio. No subas node_modules, dist, .env ni .vercel. El archivo .gitignore ya los excluye.

```bash
git init -b main
git add .
git commit -m "feat: add constructora-pro demo"
git remote add origin URL_DE_TU_REPOSITORIO
git push -u origin main
```

Crea primero un repositorio vacío, sin README inicial, para evitar historiales distintos. Para trabajar en equipo, utiliza develop como rama de integración y ramas feature/* para cambios, con pull requests y comprobaciones antes de integrar en main.

En Vercel: framework Vite, instalación npm ci, compilación npm run build, salida dist. No requiere variables de entorno.

Para conservar **https://construction-frontend-ten.vercel.app/**, conecta este repositorio al proyecto de Vercel que ya tiene ese dominio; no crees otro proyecto para reemplazarlo. Lee la guía de la carpeta principal.

## Recursos visuales

Las fotografías de referencia están incluidas en public/images. Consulta CREDITOS.md para sus fuentes. No representan servicios u obras reales.

Las fuentes se incluyen en `public/fonts`, con sus licencias OFL. No se requiere Google Fonts para visualizar el diseño.
