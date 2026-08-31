import type { Metadata } from 'next';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PageHeader } from '@/components/ui/page-header';
import { brand } from '@/config/brand';
import { paymentMethods } from '@/data/navigation';
import { generatePageMetadata } from '@/lib/metadata-helpers';

export const metadata: Metadata = generatePageMetadata({
  title: 'سوالات متداول',
  description:
    'پاسخ به سوالات متداول درباره محصولات، سفارشات، ارسال، بازگشت کالا و خدمات چشمک (برسام بوتیک).',
  url: '/faq',
  keywords: [
    'سوالات متداول',
    'FAQ',
    'راهنما',
    'پشتیبانی',
    'چشمک',
    'برسام بوتیک',
    'عینک',
  ],
});

const paymentNames = paymentMethods.map(method => method.name).join(' و ');

const faqCategories = [
  {
    title: 'فروشگاه و تماس',
    faqs: [
      {
        question: 'آدرس فروشگاه شما کجاست؟',
        answer: `فروشگاه فیزیکی ما در ${brand.address} واقع شده است. برای مسیریابی می‌توانید از نقشه صفحه تماس با ما استفاده کنید.`,
      },
      {
        question: 'چطور می‌توانم با پشتیبانی تماس بگیرم؟',
        answer: `از طریق تلفن ${brand.phone}، واتساپ، تلگرام یا اینستاگرام (@barsam.boutique1) با ما در ارتباط باشید. تیم چشمک آماده راهنمایی شماست.`,
      },
      {
        question: 'آیا می‌توانم حضوری خرید کنم؟',
        answer:
          'بله. علاوه بر خرید آنلاین، می‌توانید به فروشگاه برسام بوتیک مراجعه کنید، فریم‌ها را امتحان کنید و با راهنمایی ما مدل مناسب را انتخاب کنید.',
      },
    ],
  },
  {
    title: 'سفارشات و ارسال',
    faqs: [
      {
        question: 'ارسال سفارش چقدر طول می‌کشد؟',
        answer:
          'سفارش‌های ثبت‌شده معمولاً ظرف ۱ تا ۳ روز کاری آماده و ارسال می‌شوند. زمان تحویل بسته به شهر مقصد بین ۲ تا ۵ روز کاری متغیر است.',
      },
      {
        question: 'آیا ارسال رایگان دارید؟',
        answer:
          'بله. برای سفارش‌های بالای ۱ میلیون تومان، ارسال استاندارد رایگان است.',
      },
      {
        question: 'آیا امکان تحویل حضوری وجود دارد؟',
        answer: `بله. مشتریان زنجان و اطراف می‌توانند پس از ثبت سفارش، با هماهنگی تلفنی (${brand.phone})، سفارش خود را از فروشگاه تحویل بگیرند.`,
      },
      {
        question: 'چگونه سفارشم را پیگیری کنم؟',
        answer:
          'پس از ثبت سفارش، کد پیگیری برای شما ارسال می‌شود. همچنین در بخش «پروفایل» می‌توانید وضعیت سفارش‌های خود را ببینید.',
      },
    ],
  },
  {
    title: 'مرجوعی و تعویض',
    faqs: [
      {
        question: 'سیاست بازگشت کالا چیست؟',
        answer:
          'تا ۷ روز پس از دریافت، در صورت سالم بودن محصول و داشتن بسته‌بندی اصلی، امکان مرجوعی یا تعویض وجود دارد.',
      },
      {
        question: 'چگونه درخواست مرجوعی ثبت کنم؟',
        answer: `با تماس از طریق ${brand.phone} یا پیام در واتساپ/تلگرام، شماره سفارش و علت مرجوعی را اعلام کنید. تیم پشتیبانی راهنماییتان می‌کند.`,
      },
      {
        question: 'بازپرداخت چقدر طول می‌کشد؟',
        answer:
          'پس از بررسی و تأیید مرجوعی، مبلغ معمولاً ظرف ۳ تا ۷ روز کاری به حساب بانکی شما بازگردانده می‌شود.',
      },
    ],
  },
  {
    title: 'عینک و محصولات',
    faqs: [
      {
        question: 'چگونه فریم مناسب صورتم را انتخاب کنم؟',
        answer:
          'در صفحه فروشگاه می‌توانید بر اساس دسته‌بندی و مدل جستجو کنید. برای انتخاب بهتر، از راهنمایی حضوری در فروشگاه یا پیام در اینستاگرام/واتساپ استفاده کنید.',
      },
      {
        question: 'چه محصولاتی دارید؟',
        answer:
          'مجموعه چشمک شامل عینک طبی، عینک آفتابی و فریم‌های روز است. مشخصات هر مدل در صفحه محصول درج شده است.',
      },
      {
        question: 'آیا امکان نسخه‌گیری و تعبیه عدسی وجود دارد؟',
        answer:
          'برای عینک طبی، پس از انتخاب فریم می‌توانید با هماهنگی فروشگاه، نسخه بینایی‌سنجی خود را ثبت کنید تا عدسی مناسب برای شما آماده شود.',
      },
    ],
  },
  {
    title: 'حساب کاربری و پرداخت',
    faqs: [
      {
        question: 'چه روش‌های پرداختی قبول می‌کنید؟',
        answer: `پرداخت آنلاین از طریق درگاه ${paymentNames} انجام می‌شود. تمام تراکنش‌ها به‌صورت امن و رمزنگاری‌شده پردازش می‌شوند.`,
      },
      {
        question: 'آیا خرید از سایت امن است؟',
        answer:
          'بله. پرداخت‌ها از درگاه‌های معتبر زرین‌پال و بانک سامان انجام می‌شود و اطلاعات شما محافظت می‌گردد.',
      },
      {
        question: 'کد تخفیف دارید؟',
        answer: `بله. با عضویت در خبرنامه یا پیگیری صفحه اینستاگرام ما می‌توانید از تخفیف‌ها بهره‌مند شوید. کد فعلی: ${brand.promoCode}`,
      },
      {
        question: 'رمز عبورم را فراموش کرده‌ام؛ چه کنم؟',
        answer:
          'در صفحه ورود روی «فراموشی رمز عبور» کلیک کنید یا با پشتیبانی تماس بگیرید تا راهنماییتان کنیم.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHeader
        title='سوالات متداول'
        breadcrumbs={[
          { label: 'خانه', href: '/' },
          { label: 'سوالات متداول' },
        ]}
      />
      <div className='py-8 lg:py-12'>
        <div className='container-custom'>
          <div className='mx-auto max-w-3xl space-y-8'>
            {faqCategories.map(category => (
              <div key={category.title}>
                <h2 className='mb-4 text-xl font-semibold'>{category.title}</h2>
                <Accordion
                  type='single'
                  collapsible
                  className='rounded-xl border bg-card'
                >
                  {category.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.title}-${index}`}
                      className='px-6'
                    >
                      <AccordionTrigger className='text-left'>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className='text-muted-foreground'>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className='mx-auto mt-16 max-w-3xl rounded-2xl bg-muted/50 p-8 text-center'>
            <h2 className='mb-4 text-2xl font-bold'>هنوز سوالی دارید؟</h2>
            <p className='mb-6 text-muted-foreground'>
              تیم {brand.name} از طریق تلفن، واتساپ، تلگرام و اینستاگرام پاسخگوی
              شماست.
            </p>
            <div className='flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row'>
              <Link
                href='/contact'
                className='inline-flex items-center justify-center rounded-lg bg-metal px-6 py-3 font-medium text-primary shadow-metal transition-colors hover:bg-primary hover:bg-none hover:text-primary-foreground hover:shadow'
              >
                تماس با ما
              </Link>
              <a
                href={`tel:${brand.phoneTel}`}
                className='inline-flex items-center justify-center rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-muted'
              >
                {brand.phone}
              </a>
              <a
                href={brand.social.whatsapp}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-muted'
              >
                واتساپ
              </a>
              <a
                href={brand.social.telegram}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-muted'
              >
                تلگرام
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
