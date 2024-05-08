import { Button } from 'antd';
import { delay } from '../src/utils';
import { describe, test, expect } from 'vitest';
import React, { useState, useEffect } from 'react';
import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';
import PreviewImage from '../src/lib/PreviewImage/PreviewImage';
import img1 from '../src/assets/images/1.jpg';
import img2 from '../src/assets/images/2.png';
import img3 from '../src/assets/images/3.webp';
import img4 from '../src/assets/images/4.jpg';
import img5 from '../src/assets/images/5.jpg';
import img6 from '../src/assets/images/6.jpg';
import img7 from '../src/assets/images/7.webp';
import img8 from '../src/assets/images/8.jpeg';
import img9 from '../src/assets/images/9.webp';
import img10 from '../src/assets/images/10.webp';
import img11 from '../src/assets/images/11.webp';
import img12 from '../src/assets/images/12.png';
import img13 from '../src/assets/images/13.webp';
import img14 from '../src/assets/images/14.webp';
import img15 from '../src/assets/images/15.jpeg';
import img16 from '../src/assets/images/16.png';
import img17 from '../src/assets/images/17.webp';
import img18 from '../src/assets/images/18.webp';
import img19 from '../src/assets/images/19.jpg';
import img20 from '../src/assets/images/20.jpg';
import img21 from '../src/assets/images/21.jpg';
import img22 from '../src/assets/images/22.jpg';
import img23 from '../src/assets/images/23.jpg';
import img24 from '../src/assets/images/24.webp';
import img25 from '../src/assets/images/25.jpg';
import img26 from '../src/assets/images/26.webp';
import img27 from '../src/assets/images/27.jpg';
import img28 from '../src/assets/images/28.webp';
import img29 from '../src/assets/images/29.webp';
import img30 from '../src/assets/images/30.jpg';

const imgs = [ img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26, img27, img28, img29, img30 ];

function Example(props: any) {
  const [indictor, setIndictor] = useState(props.indictor ?? 0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIndictor(() => props.indictor ?? 0);
  }, [props.indictor]);

  useEffect(() => {
    setTimeout(() => {
      setIndictor(() => 10);
    }, 1000);
  }, []);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>预览</Button>
      <PreviewImage index={indictor} open={open} imgs={imgs} pageSize={9} onClose={() => setOpen(false)} />
    </div>
  );
}

describe('Test <PreviewImage />', function() {
  test('Test <PreviewImage /> Initial Render', async function() {
    const user = userEvent.setup();
    const { baseElement, getByRole, rerender } = render(<Example indictor={100}/>);

    // 确认 preview 未展示
    expect(baseElement.querySelector('.qm-preview-image-body')).toBeNull();

    // 点击预览
    await user.click(getByRole('button', { name: '预 览' }));

    // 等待 500ms（过渡动效），确认 preview 已展示
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-body')).not.toBeNull();
    expect(baseElement.querySelector('.qm-preview-image-body')).toBeVisible();

    // 底部的滑块
    let sliderBar = baseElement.querySelector('.qm-preview-image-foot-slider-list')!;
    // 确认 sliderBar 是否包含 30 个子节点
    expect(sliderBar.children).toHaveLength(30);
    // 确认 sliderBar 的第一个子节点为高亮
    expect(sliderBar.children[29]).toHaveClass('active');
    // 确认 sliderBar 位置是否是 { x: '-2520px'; y: '0px'; z: '0px'  }
    expect(sliderBar).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, -2520, 0)' });

    // 点击关闭按钮
    await user.click(baseElement.querySelector('.qm-vnit-iconfont.qm-vnit-icon-close.qm-preview-image-operation-icon')!);

    // 等待 500ms（过渡动效），确认 preview 已经关闭
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-body')).not.toBeVisible();

    rerender(<Example indictor={0}/>);

    // 点击预览
    await user.click(getByRole('button', { name: '预 览' }));
    // 等待 500ms（过渡动效），确认 preview 已展示
    await delay(500, null);

    // 底部的滑块
    sliderBar = baseElement.querySelector('.qm-preview-image-foot-slider-list')!;
    // 确认 sliderBar 是否包含 30 个子节点
    expect(sliderBar.children).toHaveLength(30);
    // 确认 sliderBar 的第一个子节点为高亮
    expect(sliderBar.children[0]).toHaveClass('active');
    // 确认 sliderBar 位置是否是 { x: '0px'; y: '0px'; z: '0px'  }
    expect(sliderBar).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, 0, 0)' });
    // 检测上一页、下一页按钮是否 disabled
    expect(baseElement.querySelector('.qm-preview-image-foot-prev-button')).toHaveClass('disabled', { exact: false });
    expect(baseElement.querySelector('.qm-preview-image-foot-next-button')).not.toHaveClass('disabled', { exact: false });


    // 点击下一页
    await user.click(baseElement.querySelector('.qm-preview-image-foot-next-button')!)
    await delay(500, null);
    // 检测上一页、下一页按钮是否 enable
    expect(baseElement.querySelector('.qm-preview-image-foot-prev-button')).not.toHaveClass('disabled', { exact: false });
    expect(baseElement.querySelector('.qm-preview-image-foot-next-button')).not.toHaveClass('disabled', { exact: false });
    expect(baseElement.querySelector('.qm-preview-image-foot-slider-list')).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, -1080, 0)' });

    // 多次点击下一页，确保跳转到最后一页。再检测 button 是否 disabled
    await user.click(baseElement.querySelector('.qm-preview-image-foot-next-button')!)
    await delay(500, null);
    await user.click(baseElement.querySelector('.qm-preview-image-foot-next-button')!)
    await delay(500, null);
    await user.click(baseElement.querySelector('.qm-preview-image-foot-next-button')!)
    await delay(500, null);

    // 检测 next-button 是否 disabled
    expect(baseElement.querySelector('.qm-preview-image-foot-next-button')).toHaveClass('disabled', { exact: false });
    expect(baseElement.querySelector('.qm-preview-image-foot-prev-button')).not.toHaveClass('disabled', { exact: false });
    expect(baseElement.querySelector('.qm-preview-image-foot-slider-list')).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, -2520, 0)' });

    // 多次点击上一页，确保跳转到第一页。检测 prev-button 是否 disabled
    await user.click(baseElement.querySelector('.qm-preview-image-foot-prev-button')!);
    await delay(500, null);
    await user.click(baseElement.querySelector('.qm-preview-image-foot-prev-button')!);
    await delay(500, null);
    await user.click(baseElement.querySelector('.qm-preview-image-foot-prev-button')!);
    await delay(500, null);
    await user.click(baseElement.querySelector('.qm-preview-image-foot-prev-button')!);
    await delay(500, null);

    expect(baseElement.querySelector('.qm-preview-image-foot-slider-list')).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, 0, 0)' })
    expect(baseElement.querySelector('.qm-preview-image-foot-prev-button')).toHaveClass('disabled', { exact: false });
    expect(baseElement.querySelector('.qm-preview-image-foot-next-button')).not.toHaveClass('disabled', { exact: false });

    cleanup();
  });

  test('Test <PreviewImage /> Change Indicator', async function() {
    const user = userEvent.setup();
    const { baseElement, getByRole } = render(<Example />);

    await delay(1500, null);

    // 确认 preview 未展示
    expect(baseElement.querySelector('.qm-preview-image-body')).toBeNull();

    // 点击预览
    await user.click(getByRole('button', { name: '预 览' }));

    // 等待 500ms（过渡动效），确认 preview 已展示
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-body')).not.toBeNull();
    expect(baseElement.querySelector('.qm-preview-image-body')).toBeVisible();

    /* 查看 sliderBar 初始化状态 */
    let sliderBar = baseElement.querySelector('.qm-preview-image-foot-slider-list')!;
    // 确认 sliderBar 是否包含 30 个子节点
    expect(sliderBar.children).toHaveLength(30);
    // 确认 sliderBar 的第十个子节点为高亮
    expect(sliderBar.children[10]).toHaveClass('active');
    // 确认 sliderBar 的位置是否正确; translate3d(-720px, 0px, 0px)
    expect(sliderBar).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, -720, 0)' });

    const toolBar = baseElement.querySelector('.qm-preview-image-head')!;
    const [ mirrorX, mirrorY, left, right, shrink, enlarge ] = toolBar.children;

    /* 点击按钮，图像进行 X 轴镜像 */
    await user.click(mirrorX);
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-preview-img')).toHaveStyle({ transform: 'matrix(1, 0, 0, -1, 0, 0)' });

    /* 点击按钮，图像进行 Y 轴镜像 */
    await user.click(mirrorY);
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-preview-img')).toHaveStyle({ transform: 'matrix(-1, 0, 0, -1, 0, 0)' });


    /* 点击按钮，图像进行逆时针旋转 90° */
    await user.click(left);
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-preview-img')).toHaveStyle({ transform: 'matrix(0, 1, -1, 0, 0, 0)' });

    /* 点击按钮，图像进行顺时针旋转 90° */
    await user.click(right);
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-preview-img')).toHaveStyle({ transform: 'matrix(-1, 0, 0, -1, 0, 0)' });


    /* 点击放大按钮，图像进行放大 1.5 倍 */
    await user.click(enlarge);
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-preview-img')).toHaveStyle({ transform: 'matrix(-1.5, 0, 0, -1.5, 0, 0)' });


    /* 点击缩小按钮，图像进行缩小 1.5 倍 */
    await user.click(shrink);
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-preview-img')).toHaveStyle({ transform: 'matrix(-1, 0, 0, -1, 0, 0)' });


    // 点击缩小按钮两次（图像尺寸最小尺寸是 1：1，不能再进行缩小）;
    await user.click(shrink);
    await user.click(shrink);
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-preview-img')).toHaveStyle({ transform: 'matrix(-1, 0, 0, -1, 0, 0)' });


    /* 点击切换下一张 */
    await user.click(baseElement.querySelector('.qm-preview-image-next-button')!);
    await delay(500, null);

    sliderBar = baseElement.querySelector('.qm-preview-image-foot-slider-list')!;
    // 确认 sliderBar 的第十个子节点为高亮
    expect(sliderBar.children[11]).toHaveClass('active');
    // 确认 sliderBar 的位置是否正确;
    expect(sliderBar).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, -840, 0)' });
    // 确认 img 的位置是否正确;
    expect(baseElement.querySelector('.qm-preview-image-preview-img')).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, 0, 0)' });


    /* 点击切换上一张 */
    await user.click(baseElement.querySelector('.qm-preview-image-prev-button')!);
    await delay(500, null);

    sliderBar = baseElement.querySelector('.qm-preview-image-foot-slider-list')!;
    // 确认 sliderBar 的第十个子节点为高亮
    expect(sliderBar.children[10]).toHaveClass('active');
    // 确认 sliderBar 的位置是否正确;
    expect(sliderBar).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, -720, 0)' });
    // 确认 img 的位置是否正确;
    expect(baseElement.querySelector('.qm-preview-image-preview-img')).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, 0, 0)' });


    // 点击空白处
    await user.click(baseElement.querySelector('.qm-preview-image-body-content')!);

    // 等待 500ms（过渡动效），确认 preview 是否已关闭
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-body')).not.toBeVisible()

    cleanup();
  });

  test('Test <PreviewImage /> Mouse Wheel', async function() {
    const user = userEvent.setup();
    const { baseElement, getByRole } = render(<Example />);

    await delay(1000, null);
    // 确认 preview 未展示
    expect(baseElement.querySelector('.qm-preview-image-body')).toBeNull();

    // 点击预览
    await user.click(getByRole('button', { name: '预 览' }));

    // 等待 500ms（过渡动效），确认 preview 已展示
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-body')).not.toBeNull();
    expect(baseElement.querySelector('.qm-preview-image-body')).toBeVisible();


    const img = baseElement.querySelector('.qm-preview-image-preview-img')!;
    const imgWrapper = img.parentNode as Element;

    /* 测试鼠标滚轮事件，图片对应放大和缩小 */
    await user.click(img);
    // 鼠标滚轮向前推-放大
    imgWrapper.dispatchEvent(new WheelEvent('mousewheel', { deltaY: -100, deltaMode: 0, deltaX: 0 }));
    // 等待 500ms（过渡动效），确认 preview 已展示
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-preview-img')).toHaveStyle({ transform: 'matrix(1.5, 0, 0, 1.5, 0, 0)' });

    // 继续放大
    imgWrapper.dispatchEvent(new WheelEvent('mousewheel', { deltaY: -100, deltaMode: 0, deltaX: 0 }));
    // 等待 500ms（过渡动效），确认 preview 已展示
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-preview-img')).toHaveStyle({ transform: 'matrix(2.25, 0, 0, 2.25, 0, 0)' });


    // 鼠标滚轮向后拉-缩小
    imgWrapper.dispatchEvent(new WheelEvent('mousewheel', { deltaY: 100, deltaMode: 0, deltaX: 0 }));
    // 等待 500ms（过渡动效），确认 preview 已展示
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-preview-img')).toHaveStyle({ transform: 'matrix(1.5, 0, 0, 1.5, 0, 0)' });

    // 鼠标滚轮向后拉-缩小
    imgWrapper.dispatchEvent(new WheelEvent('mousewheel', { deltaY: 100, deltaMode: 0, deltaX: 0 }));
    // 等待 500ms（过渡动效），确认 preview 已展示
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-preview-img')).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, 0, 0)' });

    cleanup();
  });


  test('Test <PreviewImage /> Drag', async function() {
    const user = userEvent.setup();

    /* 模拟 resize 事件，并将窗口大小调整为 1920 * 1080 */
    document.body.style.cssText = 'width: 1920px; height: 1080px;';
    window.innerWidth = 1920;
    window.innerHeight = 1080;
    window.dispatchEvent(new Event('resize'));

    const { baseElement, getByRole } = render(<Example />);

    await delay(1500, null);
    // 点击预览
    await user.click(getByRole('button', { name: '预 览' }));

    // 等待 500ms（过渡动效），确认 preview 已展示
    await delay(500, null);
    expect(baseElement.querySelector('.qm-preview-image-body')).toBeVisible();


    let img = baseElement.querySelector('.qm-preview-image-preview-img') as HTMLImageElement;
    const { offsetWidth, offsetHeight } = img;
    const count = Math.ceil(Math.min(1920 / offsetWidth, 1080 / offsetHeight)) + 1;
    let scale = 1;

    /**
     * 通过 mousedown、mousemove、mouseup 事件模拟 img 的拖拽
     */

    // 触发 mousedown 事件，鼠标位于屏幕坐标 x:960 y:540
    img.dispatchEvent(new MouseEvent('mousedown', {
      bubbles: true,
      composed: true,
      clientX: 960,
      clientY: 540,
    }));
    // 触发 mousemove 事件，鼠标位于屏幕坐标 x:860 y:440
    img.dispatchEvent(new MouseEvent('mousemove', {
      bubbles: true,
      composed: true,
      clientX: 860,
      clientY: 440,
    }));
    // 注意，对于 mousemove 事件我们使用 throttle(mousemove, 50) 封装，所以需要延迟 100
    await delay(100, null);
    // 在 mousemove 事件触发的过程中，检查图片的位置是否符合我们的预期
    expect(baseElement.querySelector('.qm-preview-image-body-content')).toHaveStyle({
      transform: 'matrix(1, 0, 0, 1, -100, -100)',
    });

    /**
     * 触发 mousemove 事件时，mouseup 事件与 mousemove之间应该有一个事件间隔，
     * 如果在 dispatchEvent(new MouseEvent('mousemove')) 之后，立即执行 dispatchEvent(new MouseEvent('mousemove'))，
     * 则 mousemove 将不会触发。
     */
    // 触发 mouseup 事件，鼠标位于屏幕坐标 x:860 y:440
    img.dispatchEvent(new MouseEvent('mouseup', {
      bubbles: true,
      composed: true,
      clientX: 860,
      clientY: 440,
    }));

    // 延迟 500ms，等待动效完成。
    await delay(500, null);
    /**
     * 拖拽完成后，检查图片的位置是否符合我们的预期
     * 默认情况下，图片的尺寸是小于屏幕尺寸的，拖拽结束后，应该会回到原先的位置。
     */
    expect(baseElement.querySelector('.qm-preview-image-body-content')).toHaveStyle({
      transform: 'matrix(1, 0, 0, 1, 0, 0)',
    });


    /**
     * 对图像进行放大操作，直到将图片放大到比整个屏幕都要大。
     */
    await user.click(img);
    let idx = count;
    while (idx--) {
      scale *= 1.5;
      // 鼠标滚轮向前推-放大
      img.parentNode!.dispatchEvent(new WheelEvent('mousewheel', { deltaY: -100, deltaMode: 0, deltaX: 0 }));
      await delay(500, null);
    }

    img.dispatchEvent(new MouseEvent('mousedown', {
      bubbles: true,
      composed: true,
      clientX: 960,
      clientY: 540,
    }));
    img.dispatchEvent(new MouseEvent('mousemove', {
      bubbles: true,
      composed: true,
      clientX: 860,
      clientY: 540,
    }));
    await delay(100, null);

    // 在 mousemove 事件触发的过程中，检查图片的位置是否符合我们的预期
    expect(baseElement.querySelector('.qm-preview-image-body-content')).toHaveStyle({
      transform: 'matrix(1, 0, 0, 1, -100, 0)',
    });

    img.dispatchEvent(new MouseEvent('mouseup', {
      bubbles: true,
      composed: true,
      clientX: 860,
      clientY: 540,
    }));

    // 延迟 500ms，等待动效完成。
    await delay(500, null);
    /**
     * 拖拽完成后，检查图片的位置是否符合我们的预期
     * 当图像尺寸大于屏幕尺寸时，拖拽结束后，就应该保持最后一次移动时的位置。
     */
    expect(baseElement.querySelector('.qm-preview-image-body-content')).toHaveStyle({
      transform: 'matrix(1, 0, 0, 1, -100, 0)',
    });

    /* 点击切换下一张 */
    const nextItemBtn = baseElement.querySelector('.qm-preview-image-foot-slider-list-item.active')?.nextElementSibling!;
    await user.click(nextItemBtn);
    await delay(500, null);

    // 切换图片后，检查图片的位置是否符合我们的预期
    expect(baseElement.querySelector('.qm-preview-image-body-content')).toHaveStyle({
      transform: 'matrix(1, 0, 0, 1, 0, 0)',
    });

    /* 切换上一张 */
    const prevItemBtn = baseElement.querySelector('.qm-preview-image-foot-slider-list-item.active')?.previousElementSibling!;
    await user.click(prevItemBtn);
    await delay(500, null);


    // 这里的算法必须于组件内部的计算逻辑保持一致
    const maxX = Math.floor((offsetWidth * scale - 1920) / 2);
    const maxY = Math.floor((offsetHeight * scale - 1080) / 2);
    img = baseElement.querySelector('.qm-preview-image-preview-img') as HTMLImageElement;

    await user.click(img);
    idx = count;
    while (idx--) {
      scale *= 1.5;
      // 鼠标滚轮向前推-放大
      img.parentNode!.dispatchEvent(new WheelEvent('mousewheel', { deltaY: -100, deltaMode: 0, deltaX: 0 }));
      await delay(500, null);
    }

    // 触发 mousedown 事件，鼠标位于屏幕坐标 x:960 y:540
    img.dispatchEvent(new MouseEvent('mousedown', {
      bubbles: true,
      composed: true,
      clientX: 960,
      clientY: 540,
    }));
    // 触发 mousemove 事件，鼠标位于屏幕坐标 x:960 + maxX + 100 y:540 + maxY + 100
    img.dispatchEvent(new MouseEvent('mousemove', {
      bubbles: true,
      composed: true,
      clientX: 960 + maxX + 100,
      clientY: 540 + maxY + 100,
    }));

    await delay(100, null);

    expect(baseElement.querySelector('.qm-preview-image-body-content')).toHaveStyle({
      transform: `matrix(1, 0, 0, 1, ${maxX + 100}, ${maxY + 100})`,
    });

    // 触发 mouseup 事件，鼠标位于屏幕坐标 x:960 + maxX + 100 y:540 + maxY + 100
    img.dispatchEvent(new MouseEvent('mouseup', {
      bubbles: true,
      composed: true,
      clientX: 960 + maxX + 100,
      clientY: 540 + maxY + 100,
    }));
    await delay(500, null);

    /**
     * 拖拽完成后，检查图片的位置是否符合我们的预期
     * 当图像尺寸大于屏幕尺寸时，并且拖拽的距离大于 x > maxX & y > maxY 时，拖拽结束后，xy 最大的偏移量应该是 maxX、maxY。
     */
    expect(baseElement.querySelector('.qm-preview-image-body-content')).toHaveStyle({
      transform: `matrix(1, 0, 0, 1, ${maxX}, ${maxY})`,
    });

    cleanup();
  });


  test('Test <PreviewImage /> Imgs Length Less Than PageSize', async function() {
    const { baseElement } = render(
      <PreviewImage
        index={0}
        open={true}
        pageSize={9}
        onClose={() => {}}
        imgs={[img1, img2]}
      />
    );

    await delay(1000, null);

    expect(baseElement.querySelector('.qm-preview-image-foot-slider-list')).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, 0, 0)' })
    expect(baseElement.querySelector('.qm-preview-image-foot-prev-button')).toHaveClass('disabled', { exact: false });
    expect(baseElement.querySelector('.qm-preview-image-foot-next-button')).toHaveClass('disabled', { exact: false });
  });
})
