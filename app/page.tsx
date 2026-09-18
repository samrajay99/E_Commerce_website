"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Truck,
  UserRound,
  X,
  Zap,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  colors: string[];
};

type CartItem = Product & { quantity: number };

const categories = ["All pieces", "Living", "Workspace", "Kitchen", "Travel"];

const products: Product[] = [
  { id: 1, name: "Arc floor lamp", category: "Living", price: 189, oldPrice: 249, rating: 4.9, reviews: 128, badge: "Bestseller", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85", colors: ["#e9decf", "#232323"] },
  { id: 2, name: "Kanso lounge chair", category: "Living", price: 449, rating: 4.8, reviews: 86, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85", colors: ["#c8c0b5", "#1d2b2b", "#cf7357"] },
  { id: 3, name: "Cloud ceramic set", category: "Kitchen", price: 68, rating: 4.7, reviews: 214, badge: "New", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85", colors: ["#f0ece6", "#6a7d7a"] },
  { id: 4, name: "Daily carry tote", category: "Travel", price: 82, oldPrice: 110, rating: 4.9, reviews: 172, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85", colors: ["#bb7b55", "#222222"] },
  { id: 5, name: "Linen throw blanket", category: "Living", price: 96, rating: 4.8, reviews: 63, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85", colors: ["#d9d0c4", "#778376"] },
  { id: 6, name: "Sculpt desk organizer", category: "Workspace", price: 44, rating: 4.6, reviews: 49, badge: "New", image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=900&q=85", colors: ["#252525", "#d2a783"] },
  { id: 7, name: "Noon glass carafe", category: "Kitchen", price: 54, rating: 4.8, reviews: 77, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85", colors: ["#b7c7c3", "#ece7dc"] },
  { id: 8, name: "Transit weekender", category: "Travel", price: 168, rating: 4.9, reviews: 91, badge: "Limited", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85", colors: ["#384943", "#bd7655"] },
];

const formatPrice = (price: number) => `$${price.toLocaleString("en-US")}`;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All pieces");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [sort, setSort] = useState("Featured");

  useEffect(() => {
    const savedCart = window.localStorage.getItem("nordly-cart");
    const savedWishlist = window.localStorage.getItem("nordly-wishlist");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => window.localStorage.setItem("nordly-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => window.localStorage.setItem("nordly-wishlist", JSON.stringify(wishlist)), [wishlist]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === "All pieces" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    if (sort === "Price: low to high") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "Top rated") return [...filtered].sort((a, b) => b.rating - a.rating);
    return filtered;
  }, [search, selectedCategory, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: number, amount: number) => {
    setCart((current) => current.flatMap((item) => item.id === id ? (item.quantity + amount > 0 ? [{ ...item, quantity: item.quantity + amount }] : []) : [item]));
  };

  const toggleWishlist = (id: number) => setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <main>
      <div className="announcement"><span>Complimentary shipping on orders over $150</span><span className="announcement-link">Discover the autumn edit <ArrowRight size={14} /></span></div>
      <header className="site-header">
        <button className="icon-button menu-trigger" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={21} /></button>
        <a className="wordmark" href="#top">nordly<span>.</span></a>
        <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`}>
          {categories.map((category) => <button key={category} className={selectedCategory === category ? "active" : ""} onClick={() => { setSelectedCategory(category); setMenuOpen(false); }}>{category}</button>)}
        </nav>
        <div className="header-actions">
          <div className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search pieces" aria-label="Search products" />{search && <button onClick={() => setSearch("")} aria-label="Clear search"><X size={15} /></button>}</div>
          <button className="icon-button desktop-only" aria-label="Account"><UserRound size={20} /></button>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label="Open shopping bag"><ShoppingBag size={20} /><span>{cartCount}</span></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow"><Sparkles size={14} /> Objects with intention</p><h1>Make space<br /><em>for better.</em></h1><p className="hero-description">Thoughtful pieces for living, working, and getting away. Designed to last, made to be lived with.</p><button className="primary-button" onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}>Shop the collection <ArrowRight size={17} /></button></div>
        <div className="hero-art"><div className="hero-image" /><div className="hero-note"><span>01 / 04</span><p>Quiet forms.<br />Considered details.</p><button aria-label="Next featured story"><ArrowRight size={17} /></button></div></div>
      </section>

      <section className="trust-strip"><div><Truck size={19} /><span><strong>Free shipping</strong> on orders over $150</span></div><div><Check size={19} /><span><strong>30-day returns</strong> no questions asked</span></div><div><Zap size={19} /><span><strong>Designed to last</strong> considered materials</span></div></section>

      <section className="collection" id="collection">
        <div className="section-heading"><div><p className="eyebrow">The collection</p><h2>Good things,<br /><em>well made.</em></h2></div><p className="section-intro">A rotating edit of objects that earn their place in your everyday. No filler, just favorites.</p></div>
        <div className="collection-toolbar"><div className="category-tabs">{categories.map((category) => <button key={category} className={selectedCategory === category ? "selected" : ""} onClick={() => setSelectedCategory(category)}>{category}</button>)}</div><div className="sort-control"><SlidersHorizontal size={15} /><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option>Featured</option><option>Top rated</option><option>Price: low to high</option><option>Price: high to low</option></select><ChevronDown size={14} /></div></div>
        {filteredProducts.length > 0 ? <div className="product-grid">{filteredProducts.map((product) => <article className="product-card" key={product.id}><div className="product-image-wrap"><img src={product.image} alt={product.name} /><div className="image-overlay"><button onClick={() => addToCart(product)}>Add to bag <Plus size={16} /></button></div>{product.badge && <span className="product-badge">{product.badge}</span>}<button className={`wishlist-button ${wishlist.includes(product.id) ? "liked" : ""}`} aria-label={`Add ${product.name} to wishlist`} onClick={() => toggleWishlist(product.id)}><Heart size={18} fill={wishlist.includes(product.id) ? "currentColor" : "none"} /></button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.category}</p></div><div className="product-price"><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div></div><div className="product-meta"><span className="rating"><Star size={13} fill="currentColor" /> {product.rating} <small>({product.reviews})</small></span><span className="swatches">{product.colors.map((color) => <i key={color} style={{ backgroundColor: color }} />)}</span></div></article>)}</div> : <div className="empty-products"><Search size={30} /><h3>No pieces found</h3><p>Try a different search or browse the full collection.</p><button className="text-button" onClick={() => { setSearch(""); setSelectedCategory("All pieces"); }}>Clear filters <ArrowRight size={15} /></button></div>}
        <div className="collection-footer"><span>{filteredProducts.length} pieces to explore</span><button className="text-button" onClick={() => { setSelectedCategory("All pieces"); setSearch(""); }}>View all pieces <ArrowRight size={16} /></button></div>
      </section>

      <section className="editorial"><div className="editorial-image" /><div className="editorial-copy"><p className="eyebrow">The nordly journal</p><h2>A slower<br /><em>way to live.</em></h2><p>Our guide to considered spaces, everyday rituals, and the people making things better.</p><button className="secondary-button">Read the journal <ArrowRight size={16} /></button><div className="editorial-controls"><button aria-label="Previous story"><ChevronLeft size={18} /></button><span>02 <i /> 05</span><button aria-label="Next story"><ChevronRight size={18} /></button></div></div></section>

      <section className="newsletter"><div><p className="eyebrow">A little note from us</p><h2>Good things, <em>occasionally.</em></h2><p>New arrivals, considered stories, and 10% off your first order.</p></div><form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Email address" /><button type="submit" aria-label="Subscribe"><ArrowRight size={18} /></button></form></section>
      <footer className="footer"><a className="wordmark" href="#top">nordly<span>.</span></a><p>Objects with intention, for everyday living.</p><div className="footer-links"><a href="#collection">Shop</a><a href="#collection">About</a><a href="#collection">Journal</a><a href="#collection">Contact</a></div><small>© 2024 nordly studio</small></footer>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Your selection</p><h2>Shopping bag <span>{cartCount}</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag"><X size={22} /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={34} /><h3>Your bag is waiting</h3><p>Beautiful, useful things are just a click away.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Continue shopping</button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-item-copy"><div><h3>{item.name}</h3><p>{formatPrice(item.price)}</p></div><div className="quantity"><button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div></div>)}</div><div className="cart-summary"><div className="promo-input"><input value={promo} onChange={(event) => setPromo(event.target.value)} placeholder="Promo code" /><button onClick={() => setPromoApplied(promo.trim().length > 0)}>{promoApplied ? <Check size={16} /> : "Apply"}</button></div>{promoApplied && <p className="promo-success">10% welcome discount applied</p>}<div className="summary-line"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-line"><span>Shipping</span><strong>{shipping === 0 ? "Free" : formatPrice(shipping)}</strong></div>{discount > 0 && <div className="summary-line discount"><span>Welcome discount</span><strong>-{formatPrice(discount)}</strong></div>}<div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div><button className="primary-button full-width" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Continue to checkout <ArrowRight size={17} /></button><p className="secure-note">Secure checkout · Taxes calculated at checkout</p></div></>}</aside></div>}
      {checkoutOpen && <div className="modal-backdrop"><div className="checkout-modal"><button className="modal-close" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout"><X size={20} /></button><div className="checkout-icon"><Check size={22} /></div><p className="eyebrow">Almost there</p><h2>Ready when<br /><em>you are.</em></h2><p>Your order total is <strong>{formatPrice(total)}</strong>. This demo checkout is ready to connect to Stripe, Razorpay, or your preferred payment provider.</p><button className="primary-button full-width" onClick={() => setCheckoutOpen(false)}>Place demo order <ArrowRight size={17} /></button><button className="text-button center-button" onClick={() => setCheckoutOpen(false)}>Keep shopping</button></div></div>}
    </main>
  );
}
