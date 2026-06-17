import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/types";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShieldCheck, Star,
  User
} from "lucide-react";
import Link from "next/link";

const mockOrders: Order[] = [
  {
    id: "LG-A7BX3KPQ",
    date: "2026-06-10",
    status: "shipped",
    total: 548,
    trackingNumber: "1Z999AA10123456784",
    items: [
      { productId: "2", productName: "LumaAudio Elite", quantity: 1, price: 349 },
      { productId: "8", productName: "LumaRise Flex", quantity: 1, price: 89 },
      { productId: "1", productName: "LumaSound Hub Pro", quantity: 1, price: 249 },
    ],
  },
  {
    id: "LG-M9CT4RWE",
    date: "2026-05-22",
    status: "delivered",
    total: 199,
    trackingNumber: "1Z999AA10123456785",
    items: [
      { productId: "3", productName: "LumaType Pro K1", quantity: 1, price: 199 },
    ],
  },
  {
    id: "LG-N2QR8YVD",
    date: "2026-04-15",
    status: "delivered",
    total: 1298,
    trackingNumber: "1Z999AA10123456786",
    items: [
      { productId: "5", productName: 'LumaView Pro 32"', quantity: 1, price: 799 },
      { productId: "4", productName: "LumaWatch Ultra", quantity: 1, price: 499 },
    ],
  },
];

const statusMap: Record<Order["status"], { label: string; variant: "success" | "featured" | "new" | "outline" }> = {
  delivered: { label: "Delivered", variant: "success" },
  shipped: { label: "Shipped", variant: "new" },
  processing: { label: "Processing", variant: "featured" },
  cancelled: { label: "Cancelled", variant: "outline" },
};

const settingsLinks = [
  { icon: User, label: "Personal Information", href: "#" },
  { icon: MapPin, label: "Saved Addresses", href: "#" },
  { icon: CreditCard, label: "Payment Methods", href: "#" },
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: ShieldCheck, label: "Privacy & Security", href: "#" },
  { icon: Star, label: "Reviews & Ratings", href: "#" },
];

export default function AccountPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile header */}
        <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 mb-8"
          style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              AJ
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Alex Johnson</h1>
              <p className="text-[var(--color-muted-foreground)] text-sm">alex.johnson@example.com</p>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-0.5">Member since March 2025 · {mockOrders.length} orders</p>
            </div>
            <Button variant="outline" size="sm" leftIcon={<Settings className="w-4 h-4" />}>
              Edit Profile
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[var(--color-border)]">
            {[
              { label: "Total Orders", value: mockOrders.length },
              { label: "Total Spent", value: formatPrice(mockOrders.reduce((s, o) => s + o.total, 0)) },
              { label: "Loyalty Points", value: "2,450 pts" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-[var(--color-foreground)] tabular">{s.value}</p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-[var(--color-accent)]" />
              <h2 className="text-xl font-bold text-[var(--color-foreground)]">Order History</h2>
            </div>

            {mockOrders.map((order) => {
              const status = statusMap[order.status];
              return (
                <div
                  key={order.id}
                  className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-5 space-y-4"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm font-semibold text-[var(--color-foreground)]">
                          {order.id}
                        </span>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                        {new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-[var(--color-foreground)] tabular">
                      {formatPrice(order.total)}
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {order.items.map((item, i) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span className="text-[var(--color-secondary)]">
                          {item.quantity}× {item.productName}
                        </span>
                        <span className="text-[var(--color-muted-foreground)] tabular">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {order.trackingNumber && order.status === "shipped" && (
                    <div className="flex items-center gap-2 text-xs text-[var(--color-accent)] bg-indigo-50 rounded-lg px-3 py-2">
                      <Package className="w-3.5 h-3.5 flex-shrink-0" />
                      Tracking: <span className="font-mono">{order.trackingNumber}</span>
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <Button variant="outline" size="sm">View Details</Button>
                    {order.status === "delivered" && (
                      <Button variant="ghost" size="sm">Reorder</Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Settings links */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-5 h-5 text-[var(--color-accent)]" />
              <h2 className="text-xl font-bold text-[var(--color-foreground)]">Account Settings</h2>
            </div>

            <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] overflow-hidden"
              style={{ boxShadow: "var(--shadow-card)" }}>
              {settingsLinks.map(({ icon: Icon, label, href }, i) => (
                <a
                  key={label}
                  href={href}
                  className={`flex items-center gap-3 px-5 py-4 hover:bg-[var(--color-muted)] transition-colors group ${i > 0 ? "border-t border-[var(--color-border)]" : ""}`}
                >
                  <span className="w-8 h-8 rounded-lg bg-[var(--color-muted)] flex items-center justify-center text-[var(--color-muted-foreground)] group-hover:bg-indigo-50 group-hover:text-[var(--color-accent)] transition-colors">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-[var(--color-foreground)]">{label}</span>
                  <ChevronRight className="w-4 h-4 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors" />
                </a>
              ))}
            </div>

            <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] overflow-hidden"
              style={{ boxShadow: "var(--shadow-card)" }}>
              <a
                href="#"
                className="flex items-center gap-3 px-5 py-4 hover:bg-red-50 transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-[var(--color-muted)] flex items-center justify-center text-[var(--color-muted-foreground)] group-hover:bg-red-100 group-hover:text-[var(--color-destructive)] transition-colors">
                  <LogOut className="w-4 h-4" />
                </span>
                <span className="flex-1 text-sm font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-destructive)] transition-colors">
                  Sign Out
                </span>
              </a>
            </div>

            {/* Wishlist promo */}
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[var(--color-accent)]" />
                <span className="text-sm font-semibold text-[var(--color-foreground)]">Wishlist</span>
              </div>
              <p className="text-xs text-[var(--color-muted-foreground)]">
                Save your favorite products and get notified when prices drop.
              </p>
              <Link href="/products">
                <Button variant="accent" size="sm" fullWidth>Browse & Save</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
