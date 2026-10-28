import { Deal, Voucher } from '@/types';
import { db } from './firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(src: string): string {
    if (!src) return `${BASE_PATH}/images/deal_navat.jpg`;
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
        return src;
    }
    if (BASE_PATH && src.startsWith('/') && !src.startsWith(BASE_PATH)) {
        return `${BASE_PATH}${src}`;
    }
    return src;
}

export const INITIAL_DEALS: Deal[] = [
    {
        id: "1",
        title: "Скидка 50% на всё восточное меню, шашлыки и плов в чайхане «Нават»",
        shortDescription: "Настоящие восточные блюда, сочные шашлыки на углях и праздничный плов в уютной атмосфере",
        description: "Чайхана «Нават» приглашает насладиться богатым вкусом восточной и национальной кухни со скидкой 50%. В меню: сочный шашлык из баранины и говядины, плов 'Чайханский', лагман, манты, самсы и фирменные восточные сладости.",
        category: "Рестораны и еда",
        images: [
            `${BASE_PATH}/images/deal_navat.jpg`,
            "https://placehold.co/800x500/1e293b/ffffff/png?text=Shashlik+Platter"
        ],
        originalPrice: 2000,
        discountPrice: 1000,
        discountPercent: 50,
        couponPrice: 50,
        currency: "KGS",
        boughtCount: 487,
        expiresAt: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 days
        location: "Бишкек",
        badge: "Хит",
        createdAt: Date.now() - 86400000,
        merchant: {
            name: "Чайхана «Нават»",
            address: "Бишкек, ул. Киевская, 114 (пересекает ул. Логвиненко)",
            city: "Бишкек",
            phone: "+996 (555) 500-111",
            workingHours: "Ежедневно: 10:00 — 23:00",
            instagram: "@navat_kg",
            rating: 4.9,
            reviewsCount: 320
        },
        features: [
            "Скидка 50% распространяется на всё меню кухни и шашлыки",
            "Живая музыка по вечерам с четверга по воскресенье",
            "Уютные топчаны и VIP-залы для семейных посиделок",
            "Бесплатный Wi-Fi и удобная парковка"
        ],
        conditions: [
            "Один купон действует на одного человека либо на компанию до 4-х человек со счетом до 5 000 сом",
            "Купон не распространяется на барную карту и табачные изделия",
            "Обязательно предварительное бронирование столика по телефону",
            "Купон необходимо предъявить официанту перед оформлением счета (в электронном виде)"
        ]
    },
    {
        id: "2",
        title: "Сет «Сакура Премиум» из 48 кусочков от суши-бара Arigato со скидкой 55%",
        shortDescription: "Филадельфия классик, Калифорния с крабом, Запеченный лосось и Темпура роллы",
        description: "Огромный вкуснейший сет для большой компании со скидкой 55%. Свежайший норвежский лосось, сливочный сыр Cremette, хрустящий огурец и авторские соусы от шеф-повара Arigato.",
        category: "Рестораны и еда",
        images: [
            `${BASE_PATH}/images/deal_sushi.jpg`,
            `${BASE_PATH}/images/deal_navat.jpg`
        ],
        originalPrice: 2400,
        discountPrice: 1080,
        discountPercent: 55,
        couponPrice: 60,
        currency: "KGS",
        boughtCount: 732,
        expiresAt: Date.now() + 5 * 24 * 60 * 60 * 1000,
        location: "Бишкек",
        badge: "Скидка дня",
        createdAt: Date.now() - 172800000,
        merchant: {
            name: "Суши-бар «Arigato»",
            address: "Бишкек, 7 мкр, ТЦ 'Бета Сторес 2', 3 этаж",
            city: "Бишкек",
            phone: "+996 (700) 222-333",
            workingHours: "Ежедневно: 11:00 — 00:00",
            instagram: "@arigato_sushi_kg",
            rating: 4.8,
            reviewsCount: 490
        },
        features: [
            "Вес сета: 1450 грамм (48 кусочков)",
            "В комплекте: 3 соевых соуса, васаби, имбирь и 4 пары палочек",
            "Доставка по городу или самовывоз со скидкой",
            "Только свежие морепродукты высшего качества"
        ],
        conditions: [
            "Действует на доставку и самовывоз",
            "Доставка по городу оплачивается отдельно по тарифам службы",
            "Время приготовления: от 40 до 70 минут в часы пик"
        ]
    },
    {
        id: "3",
        title: "Безлимитный день в аквапарке «Ала-Тоо» со скидкой 45%: горки, бассейны и сауна",
        shortDescription: "Экстремальные водные горки, теплый волновой бассейн, финская сауна и детская зона",
        description: "Подарите себе и семье незабываемый день ярких эмоций! Самый большой крытый аквапарк столицы предлагает безлимитный доступ ко всем аттракционам, гидромассажным бассейнам и термальным зонам со скидкой 45%.",
        category: "Развлечения",
        images: [
            `${BASE_PATH}/images/deal_aquapark.jpg`,
            `${BASE_PATH}/images/deal_spa.jpg`
        ],
        originalPrice: 1200,
        discountPrice: 660,
        discountPercent: 45,
        couponPrice: 40,
        currency: "KGS",
        boughtCount: 1240,
        expiresAt: Date.now() + 6 * 24 * 60 * 60 * 1000,
        location: "Бишкек",
        badge: "Хит",
        createdAt: Date.now() - 250000000,
        merchant: {
            name: "Аквапарк «Ала-Тоо»",
            address: "Бишкек, ул. Малдыбаева, 54/1",
            city: "Бишкек",
            phone: "+996 (312) 543-333",
            workingHours: "Вт-Вс: 10:00 — 22:00, Пн: 14:00 — 22:00",
            instagram: "@alatoo_aquapark",
            rating: 4.7,
            reviewsCount: 650
        },
        features: [
            "Безлимитный вход на целый день без ограничения по времени",
            "5 захватывающих водных горок для взрослых и подростков",
            "Детский теплый городок с анимацией",
            "Финская сухая сауна и турецкий хаммам включены в билет"
        ],
        conditions: [
            "Один купон действителен на 1 человека на один вход",
            "Детям до 3 лет вход бесплатный в сопровождении взрослых",
            "При себе необходимо иметь купальный костюм, сменную резиновую обувь и полотенце"
        ]
    },
    {
        id: "4",
        title: "Релакс-программа в Club Olympus SPA: тайский массаж 60 мин + хаммам и бассейн со скидкой 60%",
        shortDescription: "Премиальный спа-отдых в отеле Hyatt Regency: массаж от мастера из Таиланда, бассейн и фитобар",
        description: "Погрузитесь в атмосферу гармонии и спокойствия в пятизвездочном SPA-комплексе Club Olympus при отеле Hyatt Regency. Полный комплекс восстановления сил со скидкой 60% от Arzan.kg.",
        category: "Красота и SPA",
        images: [
            `${BASE_PATH}/images/deal_spa.jpg`,
            "https://placehold.co/800x500/1e293b/ffffff/png?text=Thai+Massage"
        ],
        originalPrice: 5500,
        discountPrice: 2200,
        discountPercent: 60,
        couponPrice: 100,
        currency: "KGS",
        boughtCount: 295,
        expiresAt: Date.now() + 4 * 24 * 60 * 60 * 1000,
        location: "Бишкек",
        badge: "Эксклюзив",
        createdAt: Date.now() - 300000000,
        merchant: {
            name: "Club Olympus SPA (Hyatt Regency)",
            address: "Бишкек, ул. Юсупа Абдрахманова, 191",
            city: "Бишкек",
            phone: "+996 (312) 661-234",
            workingHours: "Ежедневно: 08:00 — 22:00",
            instagram: "@hyatt_bishkek_spa",
            rating: 5.0,
            reviewsCount: 180
        },
        features: [
            "60 минут традиционного тайского или аромамассажа на выбор",
            "Неограниченное посещение крытого бассейна с подогревом",
            "Сауна, парная и зона отдыха с органическим горным фиточаем",
            "Премиальная косметика и банные принадлежности (халат, тапочки)"
        ],
        conditions: [
            "Предварительная запись обязательна минимум за 24 часа",
            "Действует в любой день недели по предварительной брони",
            "При отмене записи менее чем за 12 часов купон считается использованным"
        ]
    },
    {
        id: "5",
        title: "2 билета в Dordoi Cinema на любой фильм + большой попкорн и напитки со скидкой 50%",
        shortDescription: "Премьеры мирового проката в лазерном кинотеатре Dordoi Plaza с объемным звуком Dolby Atmos",
        description: "Идеальный вечер для двоих или с друзьями в ультрасовременном кинотеатре столицы со скидкой 50%. В стоимость купона включены 2 билета на любой сеанс (включая премьерные дни), ведро хрустящего попкорна и два напитка.",
        category: "Развлечения",
        images: [
            `${BASE_PATH}/images/deal_cinema.jpg`,
            "https://placehold.co/800x500/1e293b/ffffff/png?text=Cinema+Hall"
        ],
        originalPrice: 1100,
        discountPrice: 550,
        discountPercent: 50,
        couponPrice: 40,
        currency: "KGS",
        boughtCount: 890,
        expiresAt: Date.now() + 8 * 24 * 60 * 60 * 1000,
        location: "Бишкек",
        badge: "Хит",
        createdAt: Date.now() - 360000000,
        merchant: {
            name: "Кинотеатр «Dordoi Cinema Plaza»",
            address: "Бишкек, ул. Ибраимова, 115, ТЦ 'Dordoi Plaza', 4 этаж",
            city: "Бишкек",
            phone: "+996 (312) 979-999",
            workingHours: "Ежедневно: 10:00 — 02:00",
            instagram: "@dordoicinema",
            rating: 4.8,
            reviewsCount: 520
        },
        features: [
            "2 билета на любой 2D или 3D сеанс в стандартных залах",
            "Большой попкорн (соленый, сырный или карамельный) + 2 напитка 0.5л",
            "Комфортабельные кресла с увеличенным расстоянием между рядами",
            "Лазерная проекция 4K и звук Dolby Atmos"
        ],
        conditions: [
            "Купон можно обменять в кассе кинотеатра на билеты в день сеанса",
            "Не распространяется на VIP-залы",
            "Купон действует в будние и выходные дни"
        ]
    },
    {
        id: "6",
        title: "Отдых на побережье Иссык-Куля: 3 дня / 2 ночи в коттедже отеля «Лазурный берег» со скидкой 40%",
        shortDescription: "Песчаный пляж, хвойный парк, трехразовое питание и вечерняя анимация в Чолпон-Ате",
        description: "Уютный отдых на жемчужине Кыргызстана — озере Иссык-Куль! Просторный коттедж на компанию или семью до 4 человек в живописном месте с собственным пирсом и пляжем со скидкой 40%.",
        category: "Туризм и отдых",
        images: [
            `${BASE_PATH}/images/deal_resort.jpg`,
            "https://placehold.co/800x500/1e293b/ffffff/png?text=Beach+View"
        ],
        originalPrice: 12000,
        discountPrice: 7200,
        discountPercent: 40,
        couponPrice: 200,
        currency: "KGS",
        boughtCount: 164,
        expiresAt: Date.now() + 10 * 24 * 60 * 60 * 1000,
        location: "Иссык-Куль",
        badge: "Эксклюзив",
        createdAt: Date.now() - 420000000,
        merchant: {
            name: "Пансионат «Лазурный берег»",
            address: "Иссык-Кульская область, г. Чолпон-Ата",
            city: "Иссык-Куль",
            phone: "+996 (550) 888-999",
            workingHours: "Круглосуточно",
            instagram: "@issyk_kul_resort",
            rating: 4.9,
            reviewsCount: 145
        },
        features: [
            "Проживание 3 дня / 2 ночи в 4-местном благоустроенном коттедже",
            "Первая береговая линия — 100 метров до озера",
            "Охраняемая зеленая территория с детской площадкой и мангалами",
            "Возможность бронирования питания со скидкой 20%"
        ],
        conditions: [
            "Перед покупкой купона необходимо уточнить наличие свободных коттеджей на желаемые даты",
            "Бронирование подтверждается после активации купона",
            "Заезд в 14:00, выезд в 12:00"
        ]
    },
    {
        id: "7",
        title: "Комплексная гигиена полости рта: ультразвук + Air Flow + полировка со скидкой 70%",
        shortDescription: "Профессиональная чистка зубов от ведущих врачей стоматологической клиники Dent-Art",
        description: "Белоснежная здоровая улыбка по суперцене! Полный комплекс гигиены зубов: удаление зубного камня ультразвуковым скалером, удаление налета системой Air Flow, фторирование и полировка эмали.",
        category: "Здоровье",
        images: [
            "https://placehold.co/800x500/06b6d4/ffffff/png?text=Dent-Art+Cleaning+-70%25",
            "https://placehold.co/800x500/1e293b/ffffff/png?text=Air+Flow+Procedure",
            "https://placehold.co/800x500/1e293b/ffffff/png?text=Dental+Clinic"
        ],
        originalPrice: 3000,
        discountPrice: 890,
        discountPercent: 70,
        couponPrice: 50,
        currency: "KGS",
        boughtCount: 410,
        expiresAt: Date.now() + 5 * 24 * 60 * 60 * 1000,
        location: "Бишкек",
        badge: "-70%",
        createdAt: Date.now() - 480000000,
        merchant: {
            name: "Стоматология «Dent-Art»",
            address: "Бишкек, пр. Чуй, 128 (пересекает ул. Панфилова)",
            city: "Бишкек",
            phone: "+996 (312) 620-500",
            workingHours: "Пн-Сб: 09:00 — 20:00",
            instagram: "@dentart_bishkek",
            rating: 4.9,
            reviewsCount: 280
        },
        features: [
            "Консультация врача-стоматолога и осмотр полости рта",
            "Снятие твердого зубного камня ультразвуковым аппаратом",
            "Швейцарская методика бережного отбеливания и чистки Air Flow",
            "Укрепляющее глубокое фторирование эмали"
        ],
        conditions: [
            "Предварительная запись по телефону клиники обязательна",
            "Длительность процедуры: 40-50 минут",
            "Один купон действует на одного пациента"
        ]
    },
    {
        id: "8",
        title: "Комплексная 3-фазная детейлинг-мойка авто + уборка салона со скидкой 50%",
        shortDescription: "Премиальная мойка на итальянской автохимии Koch Chemie, сушка турбосушкой и чернение шин",
        description: "Ваш автомобиль будет сиять как новый! Бесконтактная первичная мойка, ручная мойка нано-шампунем, влажная уборка салона пылесосом, очистка стекол и защитное чернение резины со скидкой 50%.",
        category: "Авто и услуги",
        images: [
            "https://placehold.co/800x500/3b82f6/ffffff/png?text=Crystal+Auto+Wash+-50%25",
            "https://placehold.co/800x500/1e293b/ffffff/png?text=Detailing+Process",
            "https://placehold.co/800x500/1e293b/ffffff/png?text=Clean+Interior"
        ],
        originalPrice: 900,
        discountPrice: 450,
        discountPercent: 50,
        couponPrice: 30,
        currency: "KGS",
        boughtCount: 580,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
        location: "Бишкек",
        badge: "Хит",
        createdAt: Date.now() - 540000000,
        merchant: {
            name: "Детейлинг-центр «Crystal Auto»",
            address: "Бишкек, ул. Льва Толстого, 2/1",
            city: "Бишкек",
            phone: "+996 (770) 991-199",
            workingHours: "Круглосуточно: 24/7",
            instagram: "@crystal_auto_kg",
            rating: 4.7,
            reviewsCount: 390
        },
        features: [
            "3-х фазная детейлинг мойка с немецкой химией Koch Chemie",
            "Тщательная продувка кузова турбосушкой без царапин",
            "Глубокая чистка ковриков и влажная уборка пластика",
            "Зона ожидания с кофе, PlayStation и бесплатным Wi-Fi"
        ],
        conditions: [
            "Купон действует на седаны и кроссоверы (на внедорожники доплата 150 сом)",
            "Купон действует в любое время суток",
            "Живая очередь либо предварительная запись"
        ]
    }
];

const LOCAL_DEALS_KEY = 'arzan_local_deals';
const FAVORITES_KEY = 'arzan_favorites';
const VOUCHERS_KEY = 'arzan_vouchers';

export function getLocalStoredDeals(): Deal[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(LOCAL_DEALS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function saveLocalStoredDeal(deal: Deal): void {
    if (typeof window === 'undefined') return;
    try {
        const current = getLocalStoredDeals();
        localStorage.setItem(LOCAL_DEALS_KEY, JSON.stringify([deal, ...current]));
    } catch (e) {
        console.error('Failed to save deal to localStorage', e);
    }
}

export async function getAllDeals(): Promise<Deal[]> {
    const local = getLocalStoredDeals();
    if (!db) {
        const combined = [...local, ...INITIAL_DEALS];
        const map = new Map<string, Deal>();
        for (const item of combined) {
            if (!map.has(item.id)) {
                map.set(item.id, item);
            }
        }
        return Array.from(map.values());
    }
    try {
        const dealsCol = collection(db, 'deals');
        const q = query(dealsCol, orderBy('createdAt', 'desc'), limit(50));
        
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Firestore timeout')), 1200)
        );
        const snapshot = await Promise.race([getDocs(q), timeoutPromise]) as any;
        const remoteDeals: Deal[] = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data()
        } as Deal));

        const combined = [...local, ...remoteDeals, ...INITIAL_DEALS];
        const map = new Map<string, Deal>();
        for (const item of combined) {
            if (!map.has(item.id)) {
                map.set(item.id, item);
            }
        }
        return Array.from(map.values());
    } catch {
        const combined = [...local, ...INITIAL_DEALS];
        const map = new Map<string, Deal>();
        for (const item of combined) {
            if (!map.has(item.id)) {
                map.set(item.id, item);
            }
        }
        return Array.from(map.values());
    }
}

export async function getDealById(id: string): Promise<Deal | null> {
    const all = await getAllDeals();
    const found = all.find(d => d.id === id);
    if (found) return found;
    if (id === 'custom') {
        const local = getLocalStoredDeals();
        return local[0] || all[0] || null;
    }
    return null;
}

// Favorites helper
export function getFavorites(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        return stored ? JSON.parse(stored) : ['1', '2'];
    } catch {
        return ['1', '2'];
    }
}

export function toggleFavorite(dealId: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
        const favorites = getFavorites();
        const exists = favorites.includes(dealId);
        const updated = exists
            ? favorites.filter(id => id !== dealId)
            : [...favorites, dealId];
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('favorites-updated'));
        return !exists;
    } catch {
        return false;
    }
}

export function isDealFavorite(dealId: string): boolean {
    return getFavorites().includes(dealId);
}

// Vouchers (Купоны пользователя)
export function getUserVouchers(): Voucher[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(VOUCHERS_KEY);
        if (stored) return JSON.parse(stored);
        
        // Initial sample voucher for demo
        const demoVoucher: Voucher = {
            id: 'v_1',
            dealId: '1',
            dealTitle: 'Скидка 50% на всё восточное меню в чайхане «Нават»',
            merchantName: 'Чайхана «Нават»',
            merchantAddress: 'Бишкек, ул. Киевская, 114',
            merchantPhone: '+996 (555) 500-111',
            code: 'ARZ-8942-KG',
            discountPercent: 50,
            discountPrice: 1000,
            purchasedAt: Date.now() - 3600000,
            expiresAt: Date.now() + 5 * 24 * 60 * 60 * 1000,
            status: 'active'
        };
        localStorage.setItem(VOUCHERS_KEY, JSON.stringify([demoVoucher]));
        return [demoVoucher];
    } catch {
        return [];
    }
}

export function buyVoucher(deal: Deal): Voucher {
    const code = 'ARZ-' + Math.floor(1000 + Math.random() * 9000) + '-KG';
    const newVoucher: Voucher = {
        id: 'v_' + Date.now(),
        dealId: deal.id,
        dealTitle: deal.title,
        merchantName: deal.merchant.name,
        merchantAddress: deal.merchant.address,
        merchantPhone: deal.merchant.phone,
        code,
        discountPercent: deal.discountPercent,
        discountPrice: deal.discountPrice,
        purchasedAt: Date.now(),
        expiresAt: deal.expiresAt || (Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'active'
    };

    if (typeof window !== 'undefined') {
        const current = getUserVouchers();
        localStorage.setItem(VOUCHERS_KEY, JSON.stringify([newVoucher, ...current]));
        window.dispatchEvent(new Event('vouchers-updated'));
    }

    return newVoucher;
}

// Backward compatibility aliases
export const getAllProducts = getAllDeals;
export const getProductById = getDealById;
export const isProductFavorite = isDealFavorite;
