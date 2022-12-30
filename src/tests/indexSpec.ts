import express from 'express';
import { URLSearchParams } from 'url';
import routes from '../routes';
import imageResize from '../utilities/imageResize';

describe('Image is processed', () => {
    const url =
    'http://localhost:3000/api/images?filename=encenadaport&width=100&height=200';
    const params = new URLSearchParams(url);

    it('should return a resized image in the thumb folder', () => {
        expect();
    });
});
