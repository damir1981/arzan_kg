export type Language = 'ru' | 'kg';

export interface Translations {
    // Navigation & Common
    brand_tagline: string;
    city_bishkek: string;
    city_osh: string;
    city_issykkul: string;
    city_karakol: string;
    nav_deals: string;
    nav_search: string;
    nav_favorites: string;
    nav_coupons: string;
    nav_my_coupons: string;
    nav_partners: string;
    nav_login: string;
    nav_logout: string;
    nav_profile: string;
    nav_personal_account: string;
    nav_search_placeholder: string;
    nav_all_categories: string;

    // Hero Keynote
    hero_badge: string;
    hero_title_line1: string;
    hero_title_line2: string;
    hero_subtitle: string;
    hero_cta: string;
    hero_time_left: string;
    hero_days_short: string;
    hero_3_days: string;
    hero_save: string;
    hero_hot_deals: string;
    hero_already_bought: string;
    hero_people: string;
    loading_deals: string;
    empty_category_prefix: string;
    empty_category_suffix: string;
    empty_category_hint: string;

    // Trust bar
    trust_avg_discount_val: string;
    trust_avg_discount_label: string;
    trust_coupons_val: string;
    trust_coupons_label: string;
    trust_guarantee_val: string;
    trust_guarantee_label: string;

    // Categories
    cat_all: string;
    cat_food: string;
    cat_entertainment: string;
    cat_spa: string;
    cat_health: string;
    cat_tourism: string;
    cat_auto: string;
    cat_sport: string;

    // Deal Card & Badges
    badge_hit: string;
    badge_deal_of_day: string;
    badge_exclusive: string;
    badge_new: string;
    bought_times: string;
    currency_som: string;
    coupon_price_prefix: string;

    // Deal Detail
    deal_catalog: string;
    deal_features: string;
    deal_conditions: string;
    deal_description_title: string;
    deal_merchant_info: string;
    deal_original_price: string;
    deal_discount_price: string;
    deal_coupon_action: string;
    deal_refund_guarantee: string;
    deal_working_hours: string;
    deal_contacts: string;
    deal_similar_prefix: string;
    deal_not_found: string;
    deal_not_found_desc: string;
    deal_processing: string;
    deal_discount_label: string;
    deal_promocode: string;

    // Apple Wallet Pass & Vouchers
    voucher_title: string;
    voucher_subtitle: string;
    voucher_status_active: string;
    voucher_status_used: string;
    voucher_code_label: string;
    voucher_copy: string;
    voucher_copied: string;
    voucher_cashier_hint: string;
    voucher_issued_date: string;
    voucher_valid_until: string;
    voucher_view_deal: string;
    voucher_empty_title: string;
    voucher_empty_desc: string;
    voucher_explore_cta: string;

    // Purchase Modal
    modal_success_badge: string;
    modal_hint: string;
    modal_go_to_vouchers: string;
    modal_close: string;

    // Search Page
    search_input_placeholder: string;
    search_results_for: string;
    search_all_title: string;
    search_found_count: string;
    search_sort_discount: string;
    search_sort_newest: string;
    search_sort_price_asc: string;
    search_sort_price_desc: string;
    search_empty_title: string;
    search_empty_hint: string;
    search_reset: string;

    // Favorites Page
    fav_badge: string;
    fav_title: string;
    fav_subtitle: string;
    fav_empty_title: string;
    fav_empty_desc: string;
    fav_explore_cta: string;

    // Login Page
    login_create_account: string;
    login_subtitle_register: string;
    login_subtitle_signin: string;
    login_tab_signin: string;
    login_tab_register: string;
    login_google: string;
    login_or_email: string;
    login_your_name: string;
    login_email: string;
    login_password: string;
    login_submit_register: string;

    // Profile Page
    profile_guest_title: string;
    profile_guest_desc: string;
    profile_guest_cta: string;
    profile_verified: string;
    profile_for_business: string;
    profile_submit_deal: string;
    profile_how_it_works: string;
    profile_step1_title: string;
    profile_step1_desc: string;
    profile_step2_title: string;
    profile_step2_desc: string;
    profile_step3_title: string;
    profile_step3_desc: string;

    // Partner Upload Page
    upload_badge: string;
    upload_title: string;
    upload_subtitle: string;
    upload_success_title: string;
    upload_success_desc: string;
    upload_merchant_section: string;
    upload_merchant_name: string;
    upload_merchant_address: string;
    upload_merchant_phone: string;
    upload_deal_title: string;
    upload_category: string;
    upload_city: string;
    upload_orig_price: string;
    upload_disc_price: string;
    upload_photos: string;
    upload_add_photo: string;
    upload_desc: string;
    upload_publishing: string;
    upload_submit: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
    ru: {
        brand_tagline: 'Скидки и купоны в Кыргызстане',
        city_bishkek: 'Бишкек',
        city_osh: 'Ош',
        city_issykkul: 'Иссык-Куль',
        city_karakol: 'Каракол',
        nav_deals: 'Акции',
        nav_search: 'Поиск',
        nav_favorites: 'Избранное',
        nav_coupons: 'Купоны',
        nav_my_coupons: 'Мои купоны',
        nav_partners: 'Партнерам',
        nav_login: 'Войти',
        nav_logout: 'Выйти',
        nav_profile: 'Профиль',
        nav_personal_account: 'Личный кабинет',
        nav_search_placeholder: 'Поиск акций: рестораны, кино, SPA, отели...',
        nav_all_categories: 'Все категории',

        hero_badge: 'Коллективные скидки нового поколения',
        hero_title_line1: 'Твой город.',
        hero_title_line2: 'Со скидкой до 90%.',
        hero_subtitle: 'Эксклюзивные купоны в рестораны, спа, кинотеатры и курорты Иссык-Куля. Премиальный отдых по доступной цене.',
        hero_cta: 'Получить купон',
        hero_time_left: 'До завершения акции',
        hero_days_short: 'дн',
        hero_3_days: '3 дня',
        hero_save: 'Экономия',
        hero_hot_deals: 'Горящие предложения',
        hero_already_bought: 'Уже купили',
        hero_people: 'человек',
        loading_deals: 'Загрузка предложений...',
        empty_category_prefix: 'В категории',
        empty_category_suffix: 'пока нет предложений',
        empty_category_hint: 'Скоро здесь появятся новые скидки.',

        trust_avg_discount_val: 'до 90%',
        trust_avg_discount_label: 'Экономия на чек',
        trust_coupons_val: '50 000+',
        trust_coupons_label: 'Купленных купонов',
        trust_guarantee_val: '100%',
        trust_guarantee_label: 'Гарантия возврата',

        cat_all: 'Все акции',
        cat_food: 'Рестораны и еда',
        cat_entertainment: 'Развлечения',
        cat_spa: 'Красота и SPA',
        cat_health: 'Здоровье',
        cat_tourism: 'Туризм и отдых',
        cat_auto: 'Авто и услуги',
        cat_sport: 'Спорт',

        badge_hit: 'Хит',
        badge_deal_of_day: 'Скидка дня',
        badge_exclusive: 'Эксклюзив',
        badge_new: 'Новинка',
        bought_times: 'Куплено',
        currency_som: 'сом',
        coupon_price_prefix: 'Купон',

        deal_catalog: 'Каталог',
        deal_features: 'Особенности предложения',
        deal_conditions: 'Условия и правила купона',
        deal_description_title: 'Описание',
        deal_merchant_info: 'О заведении',
        deal_original_price: 'Обычная цена',
        deal_discount_price: 'Цена со скидкой',
        deal_coupon_action: 'Купить купон за',
        deal_refund_guarantee: '100% возврат средств при неиспользовании',
        deal_working_hours: 'Режим работы',
        deal_contacts: 'Контакты заведения',
        deal_similar_prefix: 'Похожие предложения в категории',
        deal_not_found: 'Предложение не найдено',
        deal_not_found_desc: 'Срок действия акции мог подойти к концу.',
        deal_processing: 'Оформляем...',
        deal_discount_label: 'Скидка',
        deal_promocode: 'Промокод',

        voucher_title: 'Мои купоны',
        voucher_subtitle: 'Предъявите электронный билет администратору заведения при заказе',
        voucher_status_active: 'Купон активен',
        voucher_status_used: 'Использован',
        voucher_code_label: 'КОД БИЛЕТА',
        voucher_copy: 'Копировать',
        voucher_copied: 'Скопировано!',
        voucher_cashier_hint: 'Покажите на кассе заведения',
        voucher_issued_date: 'Оформлен',
        voucher_valid_until: 'Действителен до',
        voucher_view_deal: 'Детали акции',
        voucher_empty_title: 'У вас пока нет активных купонов',
        voucher_empty_desc: 'Покупайте скидочные купоны в рестораны, кино, SPA и развлечения со скидкой до 90%.',
        voucher_explore_cta: 'Выбрать новые скидки',

        modal_success_badge: 'Купон успешно оформлен',
        modal_hint: 'Предъявите электронный билет администратору при заказе.',
        modal_go_to_vouchers: 'В «Мои купоны»',
        modal_close: 'Закрыть',

        search_input_placeholder: 'Поиск по акциям, заведениям и блюдам...',
        search_results_for: 'Результаты по запросу',
        search_all_title: 'Все скидки и купоны',
        search_found_count: 'Найдено предложений:',
        search_sort_discount: 'По максимальной скидке (%)',
        search_sort_newest: 'Сначала новые',
        search_sort_price_asc: 'Сначала дешевле',
        search_sort_price_desc: 'Сначала дороже',
        search_empty_title: 'ничего не найдено',
        search_empty_hint: 'Попробуйте поискать «ресторан», «спа», «кино» или «отель».',
        search_reset: 'Сбросить поиск',

        fav_badge: 'Сохраненные предложения',
        fav_title: 'Избранное',
        fav_subtitle: 'Купоны и скидки, которые вы отложили для покупки',
        fav_empty_title: 'В избранном пока нет предложений',
        fav_empty_desc: 'Нажимайте на сердечко на карточке акции, чтобы сохранить её в этот список.',
        fav_explore_cta: 'Смотреть все акции',

        login_create_account: 'Создать аккаунт',
        login_subtitle_register: 'Зарегистрируйтесь для мгновенного доступа к скидкам',
        login_subtitle_signin: 'Войдите, чтобы просматривать ваши купленные купоны',
        login_tab_signin: 'Вход',
        login_tab_register: 'Регистрация',
        login_google: 'Продолжить с Google',
        login_or_email: 'или почта',
        login_your_name: 'Ваше имя',
        login_email: 'Электронная почта',
        login_password: 'Пароль',
        login_submit_register: 'Зарегистрироваться',

        profile_guest_title: 'Личный кабинет Kupon.kg',
        profile_guest_desc: 'Войдите, чтобы активировать купоны на кассе заведения и управлять вашими скидками.',
        profile_guest_cta: 'Войти или зарегистрироваться',
        profile_verified: 'Аккаунт верифицирован',
        profile_for_business: 'Бизнесу',
        profile_submit_deal: 'Подать акцию',
        profile_how_it_works: 'Как работает Kupon.kg',
        profile_step1_title: 'Выберите акцию',
        profile_step1_desc: 'Найдите любимое заведение со скидкой до 90%.',
        profile_step2_title: 'Оформите купон',
        profile_step2_desc: 'Символическая стоимость от 30 сом за билет.',
        profile_step3_title: 'Покажите QR-код',
        profile_step3_desc: 'Покажите электронный билет на кассе при расчете.',

        upload_badge: 'Для заведений и партнеров',
        upload_title: 'Разместить акцию на Kupon.kg',
        upload_subtitle: 'Привлеките сотни новых гостей в часы низкой загрузки',
        upload_success_title: 'Акция успешно опубликована!',
        upload_success_desc: 'Перенаправляем на страницу акции...',
        upload_merchant_section: 'Данные заведения',
        upload_merchant_name: 'Название заведения *',
        upload_merchant_address: 'Адрес *',
        upload_merchant_phone: 'Телефон для записи *',
        upload_deal_title: 'Заголовок акции *',
        upload_category: 'Категория *',
        upload_city: 'Город *',
        upload_orig_price: 'Без скидки (сом) *',
        upload_disc_price: 'Со скидкой (сом) *',
        upload_photos: 'Фотографии заведения / блюд',
        upload_add_photo: 'Добавить',
        upload_desc: 'Описание акции *',
        upload_publishing: 'Публикация...',
        upload_submit: 'Опубликовать предложение на Kupon.kg',
    },
    kg: {
        brand_tagline: 'Кыргызстандагы арзандатуулар жана купондор',
        city_bishkek: 'Бишкек',
        city_osh: 'Ош',
        city_issykkul: 'Ысык-Көл',
        city_karakol: 'Каракол',
        nav_deals: 'Акциялар',
        nav_search: 'Издөө',
        nav_favorites: 'Тандалмалар',
        nav_coupons: 'Купондор',
        nav_my_coupons: 'Менин купондорум',
        nav_partners: 'Өнөктөштөргө',
        nav_login: 'Кирүү',
        nav_logout: 'Чыгуу',
        nav_profile: 'Профиль',
        nav_personal_account: 'Жеке кабинет',
        nav_search_placeholder: 'Акцияларды издөө: ресторандар, кино, SPA, отелдер...',
        nav_all_categories: 'Бардык бөлүмдөр',

        hero_badge: 'Жаңы муундагы жамааттык арзандатуулар',
        hero_title_line1: 'Сенин шаарың.',
        hero_title_line2: '90% чейин арзандатуу.',
        hero_subtitle: 'Ресторандарга, SPA-борборлорго, кинотеатрларга жана Ысык-Көлдүн пансионаттарына өзгөчө купондор. Жеткиликтүү баада премиум эс алуу.',
        hero_cta: 'Купон алуу',
        hero_time_left: 'Акция аяктаганга чейин',
        hero_days_short: 'күн',
        hero_3_days: '3 күн',
        hero_save: 'Үнөмдөө',
        hero_hot_deals: 'Ысык сунуштар',
        hero_already_bought: 'Сатып алышты',
        hero_people: 'адам',
        loading_deals: 'Сунуштар жүктөлүүдө...',
        empty_category_prefix: 'Бөлүмдө',
        empty_category_suffix: 'азырынча сунуштар жок',
        empty_category_hint: 'Жакында бул жерде жаңы арзандатуулар пайда болот.',

        trust_avg_discount_val: '90% чейин',
        trust_avg_discount_label: 'Чектен үнөмдөө',
        trust_coupons_val: '50 000+',
        trust_coupons_label: 'Сатылган купондор',
        trust_guarantee_val: '100%',
        trust_guarantee_label: 'Кайтаруу кепилдиги',

        cat_all: 'Бардык акциялар',
        cat_food: 'Ресторандар жана тамак-аш',
        cat_entertainment: 'Көңүл ачуу',
        cat_spa: 'Сулуулук жана SPA',
        cat_health: 'Ден соолук',
        cat_tourism: 'Туризм жана эс алуу',
        cat_auto: 'Авто жана кызматтар',
        cat_sport: 'Спорт',

        badge_hit: 'Хит',
        badge_deal_of_day: 'Күндүн арзандатуусу',
        badge_exclusive: 'Өзгөчө',
        badge_new: 'Жаңы',
        bought_times: 'Сатылды',
        currency_som: 'сом',
        coupon_price_prefix: 'Купон',

        deal_catalog: 'Каталог',
        deal_features: 'Сунуштун өзгөчөлүктөрү',
        deal_conditions: 'Шарттары жана эрежелери',
        deal_description_title: 'Сүрөттөмө',
        deal_merchant_info: 'Мекеме жөнүндө',
        deal_original_price: 'Кадимки баасы',
        deal_discount_price: 'Арзандатылган баасы',
        deal_coupon_action: 'Купон сатып алуу —',
        deal_refund_guarantee: 'Колдонулбаса каражат 100% кайтарылат',
        deal_working_hours: 'Иштөө убактысы',
        deal_contacts: 'Байланыш маалыматы',
        deal_similar_prefix: 'Окшош сунуштар:',
        deal_not_found: 'Сунуш табылган жок',
        deal_not_found_desc: 'Акциянын мөөнөтү аяктаган болушу мүмкүн.',
        deal_processing: 'Таризделүүдө...',
        deal_discount_label: 'Арзандатуу',
        deal_promocode: 'Промокод',

        voucher_title: 'Менин купондорум',
        voucher_subtitle: 'Буйрутма берүүдө электрондук билетти администраторго көрсөтүңүз',
        voucher_status_active: 'Купон активдүү',
        voucher_status_used: 'Колдонулду',
        voucher_code_label: 'БИЛЕТ КОДУ',
        voucher_copy: 'Көчүрүү',
        voucher_copied: 'Көчүрүлдү!',
        voucher_cashier_hint: 'Мекеменин кассасында көрсөтүңүз',
        voucher_issued_date: 'Таризделди',
        voucher_valid_until: 'Жарактуулук мөөнөтү',
        voucher_view_deal: 'Акциянын чоо-жайы',
        voucher_empty_title: 'Сизде азырынча активдүү купондор жок',
        voucher_empty_desc: 'Ресторандарга, киного, SPA жана көңүл ачуучу жайларга 90% чейин арзандатуу купондорун сатып алыңыз.',
        voucher_explore_cta: 'Жаңы арзандатууларды тандоо',

        modal_success_badge: 'Купон ийгиликтүү таризделди',
        modal_hint: 'Буйрутма берүүдө электрондук билетти администраторго көрсөтүңүз.',
        modal_go_to_vouchers: '«Менин купондорума» өтүү',
        modal_close: 'Жабуу',

        search_input_placeholder: 'Акциялар, мекемелер жана тамактар боюнча издөө...',
        search_results_for: 'Издөө жыйынтыгы:',
        search_all_title: 'Бардык арзандатуулар жана купондор',
        search_found_count: 'Табылган сунуштар:',
        search_sort_discount: 'Эң чоң арзандатуу боюнча (%)',
        search_sort_newest: 'Алдыда жаңылар',
        search_sort_price_asc: 'Алдыда арзандар',
        search_sort_price_desc: 'Алдыда кымбаттар',
        search_empty_title: 'эч нерсе табылган жок',
        search_empty_hint: '«Ресторан», «спа», «кино» же «отель» деп издеп көрүңүз.',
        search_reset: 'Издөөнү тазалоо',

        fav_badge: 'Сакталган сунуштар',
        fav_title: 'Тандалмалар',
        fav_subtitle: 'Сатып алуу үчүн сактап койгон купондор жана арзандатуулар',
        fav_empty_title: 'Тандалмаларда азырынча сунуштар жок',
        fav_empty_desc: 'Акцияны бул тизмеге сактоо үчүн анын карточкасындагы жүрөкчөнү басыңыз.',
        fav_explore_cta: 'Бардык акцияларды көрүү',

        login_create_account: 'Аккаунт түзүү',
        login_subtitle_register: 'Арзандатууларга дароо жетүү үчүн катталыңыз',
        login_subtitle_signin: 'Сатып алынган купондоруңузду көрүү үчүн кириңиз',
        login_tab_signin: 'Кирүү',
        login_tab_register: 'Катталуу',
        login_google: 'Google аркылуу улантуу',
        login_or_email: 'же почта',
        login_your_name: 'Сиздин атыңыз',
        login_email: 'Электрондук почта',
        login_password: 'Сырсөз',
        login_submit_register: 'Катталуу',

        profile_guest_title: 'Kupon.kg жеке кабинети',
        profile_guest_desc: 'Мекеменин кассасында купондорду активдештирүү жана арзандатууларды башкаруу үчүн кириңиз.',
        profile_guest_cta: 'Кирүү же катталуу',
        profile_verified: 'Аккаунт тастыкталган',
        profile_for_business: 'Бизнеске',
        profile_submit_deal: 'Акция кошуу',
        profile_how_it_works: 'Kupon.kg кантип иштейт',
        profile_step1_title: 'Акцияны тандаңыз',
        profile_step1_desc: '90% чейин арзандатуу менен сүйүктүү жайыңызды табыңыз.',
        profile_step2_title: 'Купон алыңыз',
        profile_step2_desc: 'Билет үчүн 30 сомдон башталган символикалык баа.',
        profile_step3_title: 'QR-кодду көрсөтүңүз',
        profile_step3_desc: 'Эсептешүү учурунда кассадан электрондук билетти көрсөтүңүз.',

        upload_badge: 'Мекемелер жана өнөктөштөр үчүн',
        upload_title: 'Kupon.kg сайтына акция жайгаштыруу',
        upload_subtitle: 'Төмөн жүктөм учурунда жүздөгөн жаңы конокторду тартыңыз',
        upload_success_title: 'Акция ийгиликтүү жарыяланды!',
        upload_success_desc: 'Акциянын баракчасына багыттоодо...',
        upload_merchant_section: 'Мекеменин маалыматтары',
        upload_merchant_name: 'Мекеменин аталышы *',
        upload_merchant_address: 'Дареги *',
        upload_merchant_phone: 'Жазылуу үчүн телефон *',
        upload_deal_title: 'Акциянын аталышы *',
        upload_category: 'Бөлүм *',
        upload_city: 'Шаар *',
        upload_orig_price: 'Арзандатуусуз (сом) *',
        upload_disc_price: 'Арзандатуу менен (сом) *',
        upload_photos: 'Мекеменин / тамактардын сүрөттөрү',
        upload_add_photo: 'Кошуу',
        upload_desc: 'Акциянын сүрөттөмөсү *',
        upload_publishing: 'Жарыяланууда...',
        upload_submit: 'Kupon.kg сайтына сунушту жарыялоо',
    }
};

// Map deal categories & badges across languages
export const CATEGORY_MAP: Record<string, { ru: string; kg: string }> = {
    'Все акции': { ru: 'Все акции', kg: 'Бардык акциялар' },
    'Рестораны и еда': { ru: 'Рестораны и еда', kg: 'Ресторандар жана тамак-аш' },
    'Развлечения': { ru: 'Развлечения', kg: 'Көңүл ачуу' },
    'Красота и SPA': { ru: 'Красота и SPA', kg: 'Сулуулук жана SPA' },
    'Здоровье': { ru: 'Здоровье', kg: 'Ден соолук' },
    'Туризм и отдых': { ru: 'Туризм и отдых', kg: 'Туризм жана эс алуу' },
    'Авто и услуги': { ru: 'Авто и услуги', kg: 'Авто жана кызматтар' },
    'Спорт': { ru: 'Спорт', kg: 'Спорт' },
    'Другое': { ru: 'Другое', kg: 'Башка' },
    'Хит': { ru: 'Хит', kg: 'Хит' },
    'Скидка дня': { ru: 'Скидка дня', kg: 'Күндүн арзандатуусу' },
    'Эксклюзив': { ru: 'Эксклюзив', kg: 'Өзгөчө' },
    'Новинка': { ru: 'Новинка', kg: 'Жаңы' },
};
