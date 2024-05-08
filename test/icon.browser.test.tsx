import React from 'react';
import Icon from '../src/lib/Icon';
import { test, describe, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';

describe('Test <Icon />', function() {
  test('Test <Icon /> Style, ClassName, Click Event Features', async function () {
    const user = userEvent.setup();
    const handleClick = (event: any) => {
      return event.target;
    };
    const handleClickMockFn = vi.fn(handleClick);

    const { container } = render(
      <Icon
        name="download"
        className="myIcon"
        style="font-size: 60px"
        onClick={handleClickMockFn}
      />
    );

    const iconButton = container.querySelector('.myIcon')!;

    expect(iconButton).not.toBeNull();
    expect(iconButton).toHaveStyle('font-size: 60px');

    await user.click(iconButton);

    expect(handleClickMockFn).toHaveBeenCalled();

    expect(handleClickMockFn.mock.results[0].value).toBe(iconButton);

    cleanup();
  });
});
