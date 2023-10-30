import { EyeOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons';
import React, { useRef, useEffect, useState, memo } from 'react';
import Ajax from '../ajax';
import './index.less';

type RenderItemProps = {
  uid: string;
  url?: string;
  name: string;
  action: string;
  response?: any;
  method?: string;
  percent?: number;
  disabled?: boolean;
  rawResource?: File;
  onRemove?: (uid: string) => void;
  headers?: () => { [key: string]: any };
  onError?: (uid: string, error: any) => void;
  onSuccess?: (uid: string, res: any) => void;
  status?: 'loading' | 'done' | 'error' | 'remove';
  onPreview?: (url: string, rawResource?: File) => void;
  renderItem?: (values: { url: string; uid: string; name: string }) => React.ReactNode;
};

function RenderItem(props: RenderItemProps) {
  const {
    uid,
    url,
    name,
    action,
    onError,
    headers,
    disabled,
    onRemove,
    onSuccess,
    onPreview,
    renderItem,
    rawResource,
    status = 'done',
    method = 'POST',
  } = props;

  const [imgURL, setImgURL] = useState('');
  const cvsRef = useRef<any>();
  const ctxRef = useRef<any>();
  const itemRef = useRef<any>();
  const uploadInstance = useRef<XMLHttpRequest | null>();

  // canvas 初始化
  useEffect(() => {
    // 在元素刚刚挂载到 DOM 节点时，添加一个渐入式的动画。
    itemRef.current?.classList.add('enter-from');
    requestAnimationFrame(() => itemRef.current?.classList.remove('enter-from'));

    if (url) {
      setImgURL(() => url);
    } else if (rawResource) {
      // 预先添加了一个图片预加载的功能，在网络不太流畅时可以让图片尽早的展示出来。
      const reader = new FileReader();
      reader.readAsDataURL(rawResource);
      reader.onload = () => setImgURL(() => reader.result as string);
    }

    if (!url && status === 'loading') {
      initialCanvas();
      uploadFile();
    }

    return () => {
      // 销毁画布
      ctxRef.current = null;
      // 取消请求
      if (uploadInstance.current) uploadInstance.current.abort();
    };
  }, []);

  // 开始上传图片
  function uploadFile() {
    if (uid && status === 'loading' && rawResource) {
      const formData = new FormData();
      formData.append('file', rawResource);

      const upload = new Ajax({ headers: headers });

      let isUploadStart = true;

      // 更新上传进度
      upload.onProgress((progress: number) => {
        // 如果一开始上传的时候，progress 就大于等于 1，说明网速足够快上传图片瞬间就完成了，
        // 此时，我们使用动画完成进度条，否则就是每次 onProgress 事件触发 updateProgressBar
        if (isUploadStart && progress >= 1) {
          progressBarAnimation();
        } else {
          updateProgressBar(progress);
        }

        isUploadStart = false;
      });

      // 上传成功
      upload.onSuccess(async (res: any) => {
        fadeInAnimation();
        onSuccess?.(uid, res);
        uploadInstance.current = null;
      });

      // 上传失败
      upload.onError((err: any) => {
        onError?.(uid, err);
        uploadInstance.current = null;
      });

      // 将 xhr 实例对象赋值给 uploadInstance，在组件卸载时如果请求还没有完成将会取消请求。
      uploadInstance.current = upload.create(action, method, formData);
    }
  }

  // canvas 画布初始化
  function initialCanvas() {
    cvsRef.current!.width = 84;
    cvsRef.current!.height = 84;
    const ctx = cvsRef.current!.getContext('2d')!;
    ctxRef.current = ctx;
    ctx.save();
    ctx.translate(42, 42);
  }

  // 进度条自动更新动画
  function progressBarAnimation(callback?: Function) {
    let count = 1;
    (function loop() {
      if (count >= 100) return callback?.();
      count += 3;
      count = Math.ceil(easeIn(count, count, 100 - count, 100));
      updateProgressBar(count / 100);
      requestAnimationFrame(loop);
    })();
  }

  // 更新进度条
  function updateProgressBar(progress: number) {
    if (!ctxRef.current) return;

    const ctx = ctxRef.current;

    ctx.clearRect(-42, -42, 84, 84);

    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.fillRect(-42, -42, 84, 84);

    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.arc(0, 0, 32, -0.5 * Math.PI, Math.PI * 1.5, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#1677ff';
    ctx.arc(0, 0, 32, -0.5 * Math.PI, Math.PI * 2 * progress - 0.5 * Math.PI, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'normal normal normal 14px arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillText((progress * 100).toFixed(0) + '%', 0, 0);
  }

  // 图片展示（渐入动画）
  function fadeInAnimation() {
    if (cvsRef.current) {
      cvsRef.current.style.display = 'none';
      // @ts-ignore
      cvsRef.current.parentNode.classList.toggle('fade-in');
      setTimeout(() => {
        if (cvsRef.current?.parentNode) {
          // @ts-ignore
          cvsRef.current.parentNode.style.display = 'none';
        }
      }, 300);
    }
  }

  function handleRemove() {
    // 添加离开时的动画效果
    itemRef.current?.classList.add('leave-from');
    requestAnimationFrame(() => {
      itemRef.current?.classList.remove('leave-from');
      itemRef.current?.classList.add('leave-active');
    });

    setTimeout(() => onRemove?.(uid), 300);
  }

  function handlePreview() {
    onPreview?.(imgURL, rawResource);
  }

  return (
    <li ref={itemRef} className={`qm-vnit-upload-image-item${status === 'error' ? ' error' : ''}`}>
      <div className="qm-vnit-upload-image-item-progress" style={{ display: status === 'error' ? 'none' : '' }}>
        <canvas ref={cvsRef} style={{ width: 84, height: 84 }} />
      </div>

      {/* 图片上传失败 */}
      {status === 'error' ? (
        <div className="qm-vnit-upload-image-item-error">
          <PictureOutlined style={{ fontSize: 36, color: '#ff4d4f' }} />
          <p>{name}</p>
        </div>
      ) : null}

      {/* 图片上传成功 */}
      {status === 'done' ? (
        <div className="qm-vnit-upload-image-item-preview">
          {renderItem ? (
            renderItem({ url: imgURL, uid, name })
          ) : (
            <img src={imgURL} className="qm-vnit-upload-image-item-preview-content" />
          )}
        </div>
      ) : null}

      {/* 可操作区域 */}
      <div className="qm-vnit-upload-image-item-mask">
        {/* 删除按钮 */}
        <DeleteOutlined
          onClick={handleRemove}
          style={{ display: disabled ? 'none' : '' }}
          className="qm-vnit-upload-image-item-remove-icon"
        />
        {/* 预览按钮 */}
        <EyeOutlined
          style={{ display: status === 'done' ? '' : 'none' }}
          className="qm-vnit-upload-image-item-preview-icon"
          onClick={handlePreview}
        />
      </div>
      <div className="qm-vnit-upload-image-item-tips">上传失败</div>
    </li>
  );
}

export default memo(RenderItem);

/**
 * 动画效果函数
 * @params t { number } 动画已执行次数
 * @params b { number } 当前位置
 * @params c { number } 变化量 目标位置 - 当前位置
 * @params d { number } 动画共需要执行多少次
 * @return { number }
 * @author shenxuxiang
 */
const easeIn = (t: number, b: number, c: number, d: number) => (t === 0 ? b : c * 2 ** (10 * (t / d - 1)) + b);
