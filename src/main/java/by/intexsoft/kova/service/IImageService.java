package by.intexsoft.kova.service;

import by.intexsoft.kova.entity.Image;

import java.util.List;

@Deprecated
public interface IImageService {

    Image findById(int id);

    Image save(Image image);

    Image removeById(int id);

    Image remove(Image image);

    List<Image> findAll();
}
