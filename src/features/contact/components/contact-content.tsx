'use client';

import { useState } from 'react';

import { Clock, Mail, MapPin, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { brand } from '@/config/brand';

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className='py-8 lg:py-12'>
      <div className='container-custom'>
        <div className='grid gap-8 lg:grid-cols-3'>
          {/* Contact Info */}
          <div className='space-y-6'>
            <div className='rounded-xl border bg-card p-6'>
              <div className='flex items-start gap-4'>
                <div className='flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10'>
                  <MapPin className='size-5 text-primary' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold'>آدرس</h3>
                  <p className='text-sm text-muted-foreground'>
                    <a
                      href={`https://www.google.com/maps?q=${brand.location.lat},${brand.location.lng}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:text-primary'
                    >
                      {brand.address}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className='rounded-xl border bg-card p-6'>
              <div className='flex items-start gap-4'>
                <div className='flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10'>
                  <Phone className='size-5 text-primary' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold'>تلفن</h3>
                  <p className='text-sm text-muted-foreground'>
                    <a
                      href={`tel:${brand.phoneTel}`}
                      className='hover:text-primary'
                    >
                      {brand.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className='rounded-xl border bg-card p-6'>
              <div className='flex items-start gap-4'>
                <div className='flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10'>
                  <Mail className='size-5 text-primary' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold'>ایمیل</h3>
                  <p className='text-sm text-muted-foreground'>
                    <a
                      href={`mailto:${brand.email}`}
                      className='hover:text-primary'
                    >
                      {brand.email}
                    </a>
                    <br />
                    <a
                      href={`mailto:${brand.supportEmail}`}
                      className='hover:text-primary'
                    >
                      {brand.supportEmail}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className='rounded-xl border bg-card p-6'>
              <div className='flex items-start gap-4'>
                <div className='flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10'>
                  <Clock className='size-5 text-primary' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold'>ساعت کاری</h3>
                  <p className='text-sm text-muted-foreground'>
                    شنبه - چهارشنبه: 10:00 - 21:00
                    <br />
                    پنجشنبه: 11:00 - 20:00
                    <br />
                    جمعه: 17:00 - 20:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='lg:col-span-2'>
            <div className='rounded-xl border bg-card p-6 lg:p-8'>
              <h2 className='mb-6 text-xl font-semibold'>ارسال پیام</h2>

              {isSubmitted ? (
                <div className='py-12 text-center'>
                  <div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100'>
                    <svg
                      className='size-8 text-green-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </div>
                  <h3 className='mb-2 text-xl font-semibold'>
                    {/* پیام ارسال شد */}
                    پیام ارسال نشد
                  </h3>
                  <p className='text-muted-foreground'>
                    {/* پیام شما با موفقیت ارسال شد. ما به زودی به شما پاسخ خواهیم
                    داد. */}
                    فعلا این قابلیت در دسترس نیست
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div>
                      <label className='mb-2 block text-sm font-medium'>
                        نام و نام خانوادگی
                      </label>
                      <Input
                        placeholder='نام و نام خانوادگی'
                        value={formData.name}
                        onChange={e =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='mb-2 block text-sm font-medium'>
                        ایمیل
                      </label>
                      <Input
                        type='email'
                        placeholder='example@example.com'
                        value={formData.email}
                        onChange={e =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      موضوع
                    </label>
                    <Input
                      placeholder='موضوع پیام'
                      value={formData.subject}
                      onChange={e =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium'>
                      پیام
                    </label>
                    <textarea
                      className='flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                      placeholder='پیام شما...'
                      value={formData.message}
                      onChange={e =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button type='submit' size='lg'>
                    ارسال پیام
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className='mt-12 h-[400px] overflow-hidden rounded-xl bg-muted'>
          <iframe
            src={`https://maps.google.com/maps?q=${brand.location.lat},${brand.location.lng}&hl=fa&z=16&output=embed`}
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
        </div>
      </div>
    </div>
  );
}
