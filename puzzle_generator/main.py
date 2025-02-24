from PIL import Image
import numpy as np
from matplotlib import pyplot as plt
from skimage import io
from skimage.io import imread, imsave
from sklearn.cluster import KMeans
from scipy import stats


def get_image_palette(img, num_of_colors):
    img_width, img_height, _ = img.shape
    img = img.reshape(img_width * img_height, 3)
    kmeans = KMeans(n_clusters=num_of_colors, random_state=0).fit(img)

    pixel_colors = kmeans.predict(img)
    identified_palette = np.array(kmeans.cluster_centers_).astype(int)
    return [pixel_colors, identified_palette]


def reduce_image_colors(img, pixels, palette):
    img_width, img_height, _ = img.shape
    img = img.reshape(img_width * img_height, 3)
    recolored_img = np.copy(img)

    for index in range(len(recolored_img)):
        recolored_img[index] = palette[pixels[index]]

    recolored_img = recolored_img.reshape(img_width, img_height, 3)
    return recolored_img


def pixelate_image(img, num_of_tiles):
    img_width, img_height, img_ = img.shape
    result_size = min(img_width, img_height)
    tile_size = round(result_size / num_of_tiles)
    result_size = result_size - result_size % tile_size

    x_origin = round((img_width - result_size) / 2)
    y_origin = round((img_height - result_size) / 2)

    pixelated_image = np.zeros((result_size, result_size, 3))

    for x in range(0, result_size, tile_size):
        for y in range(0, result_size, tile_size):

            tile = img[x + x_origin: x + x_origin + tile_size, y + y_origin: y + y_origin + tile_size]
            pixelated_image[x: x + tile_size, y: y + tile_size] = get_tile_mode(tile, tile_size)

    return pixelated_image


def get_tile_mode(tile, tile_size):
    tile = tile.reshape(tile_size * tile_size, 3)
    mode_color = stats.mode(tile).mode
    mode_color = [rgb / 255 for rgb in mode_color]

    return mode_color





image_name = 'rockfact2'
num_of_colors = 6
puzzle_size = 20

image_file = imread('./images/' + image_name + '.jpg')

pixel_colors, color_list = get_image_palette(image_file, num_of_colors)
print(color_list)
reduced_image = reduce_image_colors(image_file, pixel_colors, color_list)
pixelated_image =  pixelate_image(reduced_image, puzzle_size)


# io.imshow(reduced_image)
# io.show()
# io.imshow(pixelated_image)
# io.show()


plt.figure()
f, ax_arr = plt.subplots(1,2)
ax_arr[0].imshow(reduced_image)
ax_arr[1].imshow(pixelated_image)
plt.show()