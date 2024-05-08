import React from 'react';
import Image from '../src/lib/Image';
import imgURL from '../src/assets/images/1.jpg';
import { test, describe, expect, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import intersectionObserveImage from '../src/lib/Image/intersection';

describe('Test <Image />', function() {
  test('Test <Image /> Lazy, Style Features', async function () {
    const spy = vi.spyOn(intersectionObserveImage, 'intersectionCallback');
    const imgRef = { current: null } as any;

    const { queryByAltText, getByAltText } = render(
      <Image
        alt="1.jpg"
        ref={imgRef}
        src={imgURL}
        style="width: 300px; height: 200px;"
      />
    );

    expect(queryByAltText('1.jpg')).not.toBeNull();
    expect(getByAltText('1.jpg').getAttribute('src')).toContain('default.svg');

    intersectionObserveImage.intersectionCallback.call(intersectionObserveImage, [
      { target: getByAltText('1.jpg'), intersectionRatio: 1, isIntersecting: true, },
    ] as any);

    expect(spy).toHaveBeenCalled();

    expect(getByAltText('1.jpg').getAttribute('src')).toBe(imgURL);
    expect(getByAltText('1.jpg')).toHaveStyle("width: 300px; height: 200px");

    expect(imgRef.current!.instance).toBe(getByAltText('1.jpg'));

    spy.mockRestore();
    cleanup();
  });

  test('Test <Image /> Not Lazy ', async function () {
    const spy = vi.spyOn(intersectionObserveImage, 'addElement');
    const imgRef = { current: null } as any;

    const { queryByAltText, getByAltText } = render(
      <Image
        alt="1.jpg"
        ref={imgRef}
        src={imgURL}
        lazy={false}
      />
    );

    expect(spy).not.toHaveBeenCalled();
    expect(queryByAltText('1.jpg')).not.toBeNull();
    expect(getByAltText('1.jpg').getAttribute('src')).toBe(imgURL);

    spy.mockRestore();
    cleanup();
  });
});
