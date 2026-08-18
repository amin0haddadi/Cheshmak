"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { brand } from "@/config/brand";

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Our Location</h3>
                  <p className="text-sm text-muted-foreground">
                    27 Division St, New York,
                    <br />
                    NY 10002, USA
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    <a href="tel:+13459971345" className="hover:text-primary">
                      +1 345 99 71 345
                    </a>
                    <br />
                    <a href="tel:+13457464975" className="hover:text-primary">
                      +1 345 74 64 975
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    <a
                      href={`mailto:${brand.email}`}
                      className="hover:text-primary"
                    >
                      {brand.email}
                    </a>
                    <br />
                    <a
                      href={`mailto:${brand.supportEmail}`}
                      className="hover:text-primary"
                    >
                      {brand.supportEmail}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Working Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon - Fri: 9:00 AM - 6:00 PM
                    <br />
                    Sat - Sun: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-card p-6 lg:p-8">
              <h2 className="mb-6 text-xl font-semibold">Send us a Message</h2>

              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="size-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Your Name
                      </label>
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Your Email
                      </label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button type="submit" size="lg">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 h-[400px] overflow-hidden rounded-xl bg-muted">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9503398796114!2d-73.99276908459418!3d40.71455797933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a27e2f24131%3A0x64ffc98d24a3f93e!2s27%20Division%20St%2C%20New%20York%2C%20NY%2010002!5e0!3m2!1sen!2sus!4v1639000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

