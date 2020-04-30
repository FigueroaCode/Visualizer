import React from 'react';
import { mat4 } from 'gl-matrix';
import { transformMatrix } from '../utils/math';

test('Test transform matrix function - Identity Matrix', () => {
    const matrix = transformMatrix(0,0,0, 0,0,0 ,1);
    expect(matrix).toStrictEqual(mat4.create());
});
