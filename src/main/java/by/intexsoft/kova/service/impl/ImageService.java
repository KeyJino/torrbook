package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.entity.Image;
import by.intexsoft.kova.repository.ImageRepository;
import by.intexsoft.kova.service.IImageService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Service for feature working with {@link Image}s.
 * Now not using.
 */
@Deprecated
public class ImageService implements IImageService {

    @Autowired
    ImageRepository imageRepository;

    @Override
    public Image findById(int id) {
        return imageRepository.findById(id).get();
    }

    @Override
    public Image save(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public Image removeById(int id) {
        Image image = findById(id);
        imageRepository.deleteById(id);
        return image;
    }

    @Override
    public Image remove(Image image) {
        Image img = findById(image.getId());
        imageRepository.delete(image);
        return img;
    }

    @Override
    public List<Image> findAll() {
        return imageRepository.findAll();
    }
}
