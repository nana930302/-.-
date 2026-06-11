from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parent
SRC = Path("/Users/duanlina/Desktop/YANGZAI/HTML学习第一天/小程序项目-今天的吃喝听我的/assert/ChatGPT Image 2026年6月7日 11_37_06 (1).png")
ASSETS = ROOT / "assets"


def feather(mask, radius=2):
    return mask.filter(ImageFilter.GaussianBlur(radius))


def polygon_mask(size, points, radius=2):
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.polygon(points, fill=255)
    return feather(mask, radius)


def ellipse_mask(size, box, radius=2):
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse(box, fill=255)
    return feather(mask, radius)


def rounded_mask(size, box, radius=24, blur=1):
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle(box, radius=radius, fill=255)
    return feather(mask, blur)


def cutout(img, box, points=None, ellipse=None, rounded=None, alpha_scale=1.0):
    crop = img.crop(box).convert("RGBA")
    size = crop.size
    if points:
        mask = polygon_mask(size, points)
    elif ellipse:
        mask = ellipse_mask(size, ellipse)
    elif rounded:
        mask = rounded_mask(size, rounded["box"], rounded.get("radius", 24), rounded.get("blur", 1))
    else:
        mask = Image.new("L", size, 255)
    if alpha_scale != 1.0:
        mask = mask.point(lambda p: int(p * alpha_scale))
    crop.putalpha(mask)
    return crop


def build_glass(size):
    w, h = size
    glass = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glass)

    # Outer dome shell
    shell_box = (40, 18, w - 42, h - 18)
    draw.rounded_rectangle(shell_box, radius=165, outline=(255, 255, 255, 200), width=10)
    draw.rounded_rectangle((55, 34, w - 56, h - 35), radius=150, outline=(255, 255, 255, 95), width=3)

    # Soft glass fill
    fill = Image.new("RGBA", size, (0, 0, 0, 0))
    fill_draw = ImageDraw.Draw(fill)
    fill_draw.rounded_rectangle((50, 28, w - 50, h - 28), radius=155, fill=(255, 255, 255, 38))
    fill = fill.filter(ImageFilter.GaussianBlur(2))
    glass.alpha_composite(fill)

    # Reflections
    hi = Image.new("RGBA", size, (0, 0, 0, 0))
    hi_draw = ImageDraw.Draw(hi)
    hi_draw.ellipse((95, 70, 350, 290), fill=(255, 255, 255, 58))
    hi_draw.ellipse((690, 40, 840, 170), fill=(255, 255, 255, 48))
    hi_draw.arc((90, 52, 430, 315), 130, 234, fill=(255, 255, 255, 170), width=12)
    hi_draw.arc((600, 55, 872, 322), 315, 32, fill=(255, 255, 255, 150), width=10)
    hi = hi.filter(ImageFilter.GaussianBlur(8))
    glass.alpha_composite(hi)
    return glass


def build_machine(img):
    crop = img.crop((55, 355, 1115, 1185)).convert("RGBA")
    mask = Image.new("L", crop.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((20, 0, crop.size[0] - 20, 220), radius=70, fill=255)
    draw.rounded_rectangle((80, 540, crop.size[0] - 80, crop.size[1] - 30), radius=60, fill=255)
    draw.rectangle((0, 515, 190, crop.size[1] - 130), fill=255)
    mask = feather(mask, 1)
    crop.putalpha(mask)
    return crop


def build_title(img):
    box = (745, 15, 1295, 560)
    points = [
        (124, 18), (390, 6), (468, 48), (500, 133), (476, 220),
        (521, 307), (502, 431), (431, 504), (301, 533), (126, 525),
        (69, 459), (15, 371), (21, 246), (80, 173), (74, 88)
    ]
    return cutout(img, box, points=points)


def save():
    ASSETS.mkdir(exist_ok=True)
    img = Image.open(SRC).convert("RGBA")

    assets = {
        "dog.png": cutout(
            img,
            (128, 5, 860, 565),
            points=[
                (108, 322), (44, 274), (10, 201), (53, 126), (132, 35),
                (285, 6), (494, 16), (625, 89), (702, 215), (709, 326),
                (656, 402), (572, 452), (510, 553), (398, 548), (313, 535),
                (266, 474), (204, 489), (151, 446), (138, 380)
            ],
        ),
        "cat.png": cutout(
            img,
            (785, 600, 1306, 1205),
            points=[
                (270, 20), (389, 61), (477, 164), (510, 286), (514, 440),
                (463, 575), (295, 604), (157, 575), (70, 507), (31, 362),
                (41, 231), (117, 90)
            ],
        ),
        "machine.png": build_machine(img),
        "glass.png": build_glass((970, 420)),
        "btn-start.png": cutout(img, (345, 886, 673, 1158), ellipse=(23, 0, 305, 272)),
        "tag-hotpot.png": cutout(
            img, (168, 546, 468, 722),
            points=[(25, 56), (72, 21), (276, 0), (297, 35), (275, 150), (48, 176), (0, 120)]
        ),
        "tag-bbq.png": cutout(
            img, (394, 552, 700, 727),
            points=[(20, 66), (65, 21), (287, 0), (305, 46), (279, 153), (57, 173), (0, 116)]
        ),
        "tag-milktea.png": cutout(
            img, (657, 564, 938, 736),
            points=[(22, 57), (57, 25), (257, 5), (280, 48), (250, 153), (33, 171), (0, 110)]
        ),
        "tag-spicyhotpot.png": cutout(
            img, (203, 719, 540, 895),
            points=[(30, 66), (77, 27), (309, 0), (336, 42), (311, 154), (51, 176), (0, 126)]
        ),
        "tag-sushi.png": cutout(
            img, (428, 748, 711, 904),
            points=[(17, 34), (48, 10), (253, 0), (282, 23), (267, 130), (36, 156), (0, 122)]
        ),
        "tag-friedchicken.png": cutout(
            img, (622, 720, 900, 897),
            points=[(19, 55), (65, 18), (259, 0), (278, 40), (249, 154), (46, 176), (0, 115)]
        ),
        "title.png": build_title(img),
    }

    for name, asset in assets.items():
        asset.save(ASSETS / name)


if __name__ == "__main__":
    save()
