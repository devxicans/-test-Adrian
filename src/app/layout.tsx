import type { Metadata } from "next";
import { Sen } from "next/font/google";
import { ViewWrapper } from '@/lib';
import './global.css';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const sen = Sen({ style: 'normal', subsets: ['latin'], variable: '--font-family' });

export const metadata: Metadata = {
  title: "Adrian - HomePage",
  description: "NextJS app with @UiReact library set up",
};

export default function RootLayout({
  children,}: Readonly<{children: React.ReactNode;
  }>){
  return (
    <html lang="en">
      <body>
        <ToastContainer />
          <ViewWrapper>
            {children}
          </ViewWrapper>
      </body>
    </html>
  );
}
