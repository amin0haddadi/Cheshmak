'use client';

import { useState } from 'react';
import { MapPin, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { ErrorMessage } from '@/components/ui/error-message';
import { useAddresses } from '@/hooks/queries/addresses';
import {
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
} from '@/hooks/mutations/addresses';
import { checkoutCities } from '@/data/cities';
import type { ApiAddress, CreateAddressRequest } from '@/lib/api/addresses';

const emptyForm: CreateAddressRequest = {
  title: 'منزل',
  first_name: '',
  last_name: '',
  phone: '',
  address_line_1: '',
  postal_code: '',
  city_id: Number(checkoutCities[0]?.id ?? 1),
  is_default: false,
};

export function AddressesContent() {
  const { data: addresses = [], isLoading, error, refetch } = useAddresses();
  const { mutateAsync: createAddress, isPending: creating } = useCreateAddress();
  const { mutateAsync: updateAddress, isPending: updating } = useUpdateAddress();
  const { mutate: deleteAddress, isPending: deleting } = useDeleteAddress();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const isBusy = creating || updating || deleting;

  if (isLoading) {
    return <Loading message="در حال بارگذاری آدرس‌ها..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="خطا در بارگذاری آدرس‌ها. لطفاً دوباره تلاش کنید."
        onRetry={() => refetch()}
      />
    );
  }

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData({ ...emptyForm, is_default: addresses.length === 0 });
    setShowForm(true);
  };

  const openEdit = (address: ApiAddress) => {
    setEditingId(address.id);
    setFormData({
      title: address.title || 'منزل',
      first_name: address.first_name || '',
      last_name: address.last_name || '',
      phone: address.phone || '',
      address_line_1: address.address_line_1 || '',
      postal_code: address.postal_code || '',
      city_id: address.city_id || checkoutCities[0]?.id || 1,
      is_default: Boolean(address.is_default),
    });
    setShowForm(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' && 'checked' in e.target
        ? (e.target as HTMLInputElement).checked
        : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'city_id'
          ? Number(value)
          : type === 'checkbox'
            ? checked
            : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: CreateAddressRequest = {
      title: formData.title,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      address_line_1: formData.address_line_1,
      postal_code: formData.postal_code,
      city_id: formData.city_id,
      is_default: formData.is_default,
    };

    if (editingId) {
      await updateAddress({ id: editingId, payload });
    } else {
      await createAddress(payload);
    }
    resetForm();
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">آدرس‌های ذخیره شده</h2>
        <Button type="button" onClick={openCreate} disabled={isBusy}>
          افزودن آدرس
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 grid gap-4 rounded-lg border p-4 sm:grid-cols-2"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">عنوان</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">شهر</label>
            <select
              name="city_id"
              value={formData.city_id}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {checkoutCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">نام</label>
            <Input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              نام خانوادگی
            </label>
            <Input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">تلفن</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">کد پستی</label>
            <Input
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium">آدرس کامل</label>
            <Input
              name="address_line_1"
              value={formData.address_line_1}
              onChange={handleChange}
              required
            />
          </div>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input
              type="checkbox"
              name="is_default"
              checked={formData.is_default}
              onChange={handleChange}
            />
            آدرس پیش‌فرض
          </label>
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit" disabled={isBusy}>
              {editingId ? 'ذخیره تغییرات' : 'ثبت آدرس'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isBusy}
            >
              انصراف
            </Button>
          </div>
        </form>
      )}

      {addresses.length === 0 && !showForm ? (
        <p className="text-sm text-muted-foreground">
          هنوز آدرسی ذخیره نکرده‌اید.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <div key={address.id} className="rounded-lg border p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  <span className="font-medium">
                    {address.title || 'آدرس'}
                  </span>
                  {address.is_default && (
                    <span className="rounded bg-primary/10 px-2 py-1 text-xs text-primary">
                      پیش‌فرض
                    </span>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    disabled={isBusy}
                    onClick={() => openEdit(address)}
                    aria-label="ویرایش آدرس"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 text-destructive"
                    disabled={isBusy}
                    onClick={() => deleteAddress(address.id)}
                    aria-label="حذف آدرس"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {[address.first_name, address.last_name]
                  .filter(Boolean)
                  .join(' ')}
                {address.phone ? ` — ${address.phone}` : ''}
                <br />
                {address.city?.name ? `${address.city.name}، ` : ''}
                {address.address_line_1}
                <br />
                {address.postal_code
                  ? `کد پستی: ${address.postal_code}`
                  : null}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
