import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center px-4'>
      <div className='max-w-lg text-center'>
        <div className='relative mx-auto mb-8 size-64'>
          <Image
            src='/assets/img/insta03.jpg'
            alt='صفحه یافت نشد'
            fill
            className='rounded-full object-cover'
          />
        </div>
        <h1 className='mb-4 text-6xl font-bold text-primary'>404</h1>
        <h2 className='mb-4 text-2xl font-semibold'>صفحه یافت نشد</h2>
        <p className='mb-8 text-muted-foreground'>
          متأسفانه صفحه‌ای که دنبال آن هستید وجود ندارد یا جابه‌جا شده است.
          بیایید شما را به مسیر درست برگردانیم.
        </p>
        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <Button asChild size='lg'>
            <Link href='/'>خانه</Link>
          </Button>
          <Button asChild variant='outline' size='lg'>
            <Link href='/shop'>فروشگاه</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
