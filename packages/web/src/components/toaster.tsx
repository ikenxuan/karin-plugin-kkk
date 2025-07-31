import { Toaster as HotToaster } from 'react-hot-toast'

/**
 * 新粗野主义风格的Toast通知组件
 * @returns JSX.Element
 */
export const Toaster = () => {
  return (
    <HotToaster
      toastOptions={{
        // 成功样式
        success: {
          style: {
            background: '#22c55e',
            color: '#000',
            fontWeight: 'bold',
            border: '3px solid #000',
            borderRadius: '0px',
            boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
            fontSize: '16px',
            padding: '16px',
            zIndex: 10000,
          },
          iconTheme: {
            primary: '#000',
            secondary: '#22c55e',
          },
        },
        // 错误样式
        error: {
          style: {
            background: '#ef4444',
            color: '#fff',
            fontWeight: 'bold',
            border: '3px solid #000',
            borderRadius: '0px',
            boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
            fontSize: '16px',
            padding: '16px',
            zIndex: 10000,
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          },
        },
        // 加载样式
        loading: {
          style: {
            background: '#3b82f6',
            color: '#fff',
            fontWeight: 'bold',
            border: '3px solid #000',
            borderRadius: '0px',
            boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
            fontSize: '16px',
            padding: '16px',
            zIndex: 10000,
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#3b82f6',
          },
        },
        // 默认样式
        style: {
          background: '#fbbf24',
          color: '#000',
          fontWeight: 'bold',
          border: '3px solid #000',
          borderRadius: '0px',
          boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
          fontSize: '16px',
          padding: '16px',
          zIndex: 10000,
        },
        duration: 4000,
        position: 'top-right',
      }}
      containerStyle={{
        zIndex: 10000,
        top: '20px',
        right: '20px',
      }}
    />
  )
}

export default Toaster