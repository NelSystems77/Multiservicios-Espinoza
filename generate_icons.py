#!/usr/bin/env python3
"""
Generador de iconos para la PWA Destaqueos 24 Horas
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, output_path):
    """Crea un icono con el logo D24H"""
    # Crear imagen con fondo transparente
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Dibujar círculo de fondo con gradiente simulado
    # Color principal: azul oscuro #1e3a8a
    # Color acento: naranja #f97316
    
    # Círculo exterior (naranja/rojo)
    draw.ellipse([0, 0, size-1, size-1], fill=(220, 38, 38, 255), outline=None)
    
    # Círculo medio (gradiente)
    margin = int(size * 0.05)
    draw.ellipse([margin, margin, size-margin-1, size-margin-1], 
                 fill=(249, 115, 22, 255), outline=None)
    
    # Círculo interior (azul)
    margin = int(size * 0.1)
    draw.ellipse([margin, margin, size-margin-1, size-margin-1], 
                 fill=(30, 58, 138, 255), outline=None)
    
    # Calcular tamaño de texto
    font_size = int(size * 0.3)
    
    # Intentar usar una fuente del sistema o usar la predeterminada
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        # Si no se encuentra la fuente, usar la predeterminada
        font = ImageFont.load_default()
    
    # Texto
    text = "D24H"
    
    # Calcular posición del texto para centrarlo
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - int(size * 0.05)
    
    # Dibujar texto con sombra
    shadow_offset = max(1, int(size * 0.01))
    draw.text((x + shadow_offset, y + shadow_offset), text, fill=(0, 0, 0, 128), font=font)
    draw.text((x, y), text, fill=(251, 191, 36, 255), font=font)  # Color amarillo
    
    # Guardar imagen
    img.save(output_path, 'PNG')
    print(f"✓ Icono creado: {output_path} ({size}x{size})")

def main():
    """Genera todos los iconos necesarios"""
    # Tamaños de iconos requeridos
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    
    # Crear directorio icons si no existe
    os.makedirs('icons', exist_ok=True)
    
    print("Generando iconos para la PWA...")
    print("-" * 50)
    
    for size in sizes:
        output_path = f'icons/icon-{size}.png'
        create_icon(size, output_path)
    
    print("-" * 50)
    print("✓ Todos los iconos generados exitosamente")

if __name__ == '__main__':
    main()
