document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // Splash Screen Loading Simulation
    // -----------------------------------------------------------------
    const splashScreen = document.getElementById('splashScreen');
    const splashProgressFill = document.getElementById('splashProgressFill');
    
    function showSplashScreen(isReload = false, callback = null) {
        if (!splashScreen || !splashProgressFill) {
            if (callback) callback();
            return;
        }

        const splashBrand = splashScreen.querySelector('.splash-brand');
        const splashTagline = splashScreen.querySelector('.splash-tagline');
        
        const originalBrand = '<span class="splash-brand-hira">HIRA</span><span class="splash-brand-beacon">Beacon</span>';
        const originalTagline = 'Elite Literature Publishing &amp; Library';

        if (isReload) {
            if (splashBrand) {
                splashBrand.innerHTML = '<span class="splash-brand-hira" style="color: var(--glow-orange-bright); text-shadow: 0 0 15px rgba(255, 111, 0, 0.6);">RELOADING</span>';
            }
            if (splashTagline) {
                splashTagline.innerHTML = 'Refreshing Library Feed...';
            }
        } else {
            if (splashBrand) splashBrand.innerHTML = originalBrand;
            if (splashTagline) splashTagline.innerHTML = originalTagline;
        }

        splashProgressFill.style.width = '0%';
        splashScreen.classList.remove('fade-out');

        let progress = 0;
        const duration = isReload ? 120 : 180; // Fast loading duration (120ms for reload, 180ms for initial)
        const intervalTime = 10;
        const increment = 100 / (duration / intervalTime);
        const splashInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 100;
                clearInterval(splashInterval);
                splashProgressFill.style.width = '100%';
                setTimeout(() => {
                    splashScreen.classList.add('fade-out');
                    setTimeout(() => {
                        if (callback) callback();
                    }, 350); // Wait for CSS transition (0.35s)
                }, 80);
            } else {
                splashProgressFill.style.width = `${progress}%`;
            }
        }, intervalTime);
    }

    // Run initial splash screen
    showSplashScreen(false);

    // -----------------------------------------------------------------
    // Pre-loaded Simple Works Data
    // -----------------------------------------------------------------
    const defaultArticles = [
        {
            id: 'work-1',
            title: 'Whispers of the Quantum Grid',
            author: 'Cora Vance',
            category: 'poetry',
            language: 'english',
            readTime: 2,
            date: 'May 21, 2026',
            cover: './assets/images/1518156677180.jpg',
            excerpt: 'A cybernetic reflection on gravitational coordinates, equations, and code. Finding poetry in the math.',
            body: `We traced the coordinates in carbon dust,
where the electric pulse meets the iron rust,
a silent lattice in the void of space,
where gravity bends to the mesh's grace.

Is the vector true, or is the warp a lie?
We watched the waves collapse beneath the sky.
The glowing lines of orange, neon, bright,
sing their quantum secrets to the night.

Close your eyes and hear the matrix hum,
the binary tide of things to come,
for in the grid, the silent scribes agree,
that gravity is just a memory.`,
            milestones: [
                'Pondered the cybernetic lattice and vector true',
                'Read the verse regarding the glowing orange lines',
                'Finished the poem and listened to the matrix hum'
            ],
            attachments: [
                {
                    name: 'quantum_specifications.pdf',
                    size: 782,
                    type: 'application/pdf',
                    data: 'JVBERi0xLjQKJdbiw6MKMSAwIG9iagogIDw8IC9UeXBlIC9DYXRhbG9nCiAgICAgL1BhZ2VzIDIgMCBSCiAgPj4KZW5kb2JqCjIgMCBvYmoKICA8PCAvVHlwZSAvUGFnZXMKICAgICAvS2lkcyBbIDMgMCBSIF0KICAgICAvQ291bnQgMQogID4+CmVuZG9iagozIDAgb2JqCiAgPDwgL1R5cGUgL1BhZ2UKICAgICAvUGFyZW50IDIgMCBSCiAgICAgL1Jlc291cmNlcyA8PCAvRm9udCA8PCAvFjEgNCAwIFIgPj4gPj4KICAgICAvTWVkaWFCb3ggWyAwIDAgNTk1IDg0MiBdCiAgICAgL0NvbnRlbnRzIDUgMCBSCiAgPj4KZW5kb2JqCjQgMCBvYmoKICA8PCAvVHlwZSAvRm9udAogICAgIC9TdWJ0eXBlIC9UeXBlMQogICAgIC9CYXNlRm9udCAvSGVsdmV0aWNhCiAgPj4KZW5kb2JqCjUgMCBvYmoKICA8PCAvTGVuZ3RoIDY5ID4+CnN0cmVhbQpCVEQKL0YxIDEyIFRmCjcyIDcyMCBUZApoZWxsbwpFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMDcwIDAwMDAwIG4gCjAwMDAwMDAxMzUgMDAwMDAgbiAKMDAwMDAwMDI3NSAwMDAwMCBuIAowMDAwMDAwMzU2IDAwMDAwIG4gCnRyYWlsZXIKICA8PCAvU2l6ZSA2CiAgICAgL1Jvb3QgMSAwIFIKICA+PgpzdGFydHhyZWYKNDc2CiUlRU9GCg=='
                }
            ]
        },
        {
            id: 'work-2',
            title: 'The Clockwork Oasis',
            author: 'Jasper Eldon',
            category: 'short-stories',
            language: 'english',
            readTime: 4,
            date: 'May 18, 2026',
            cover: './assets/images/1516979187457.jpg',
            excerpt: 'In the heart of the copper sand dunes, a lost steampunk automaton discovers a forgotten mechanical paradise.',
            body: `In the endless copper dunes of the Southern Reach, the winds carried only iron filings and the scent of ozone. Barnaby, a mechanical surveyor built three centuries ago, dragged his bronze chassis across the shifting sands. His gears ground in protest, dry and choked with dust.

His optical lens flickered, catching a sudden anomaly. Rising from the heat haze was a dome of polished brass, its support ribs glowing with a faint, warm orange luminescence. He approached, his metal joints clicking in the heavy silence.

He entered. Inside, there was no sand, only quiet. Gear-driven clockwork orchids bloomed along copper pipes, dripping golden lubricant into clear crystal pools. Automaton butterflies with stained-glass wings fluttered in precise, mathematically determined orbits.

At the center sat an ancient fountain, whispering steam into the air. Barnaby dipped his rusted hands into the oil, feeling the friction slip away. He was home.`,
            milestones: [
                'Followed Barnaby across the copper sands',
                'Discovered the glowing brass dome in the dunes',
                'Witnessed the clockwork orchids and glass butterflies'
            ],
            attachments: [
                {
                    name: 'clockwork_blueprints.zip',
                    size: 154,
                    type: 'application/zip',
                    data: 'UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA=='
                }
            ]
        },
        {
            id: 'work-3',
            title: 'Echoes of Silence',
            author: 'Sylvia Cole',
            category: 'essays',
            language: 'english',
            readTime: 5,
            date: 'May 14, 2026',
            cover: './assets/images/1455390582262.jpg',
            excerpt: 'A creative and philosophical meditation on quiet spaces, the blank page, and the duty of the modern writer.',
            body: `We live in a world that is loud, crowded with notifications, alarms, and the constant digital hum of progress. In this chaos, we often forget that creation requires stillness.

To write is to negotiate with silence. The blank page is not empty; it is a canvas of quiet anticipation, waiting for the first mark of ink to break the spell. As writers, our duty is not to fill the void with noise, but to trace paths of meaning through it.

The lines we write are like glowing filaments in a dark forest. They do not illuminate the entire landscape, but they guide the traveler’s eye, pointing towards deeper truths. In the quietest hours, when the world sleeps, the scribe finds the courage to speak, transforming silence into echoes that outlast the night.`,
            milestones: [
                'Reflected on the noise of modern digital life',
                'Analyzed the relationship between empty space and creation',
                'Endorsed the concept of words as glowing filaments'
            ],
            attachments: [
                {
                    name: 'silence_guidelines.docx',
                    size: 120,
                    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    data: 'UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA=='
                }
            ]
        },
        {
            id: 'work-4',
            title: 'صدى الصحراء الذهبية',
            author: 'أمين الرويحي',
            category: 'poetry',
            language: 'arabic',
            readTime: 2,
            date: 'May 23, 2026',
            cover: './assets/images/1509198397868.jpg',
            excerpt: 'قصيدة شعرية تتأمل في رمال الصحراء الذهبية وسحر الليل وهدوء النجوم بين كثبان الرمل.',
            body: `تحت ضياء النجوم البعيدة،
ترقص رمال الصحراء الذهبية مع الريح،
تخفي في طياتها حكايات قديمة،
عن فرسان ولوا، وعن ليل جريح.

يا أيها الرمل الساكن في المدى،
أنت دفتر التاريخ ومهد القصيد،
يرتد فيك صوت الريح صدى،
ويحيا في صمتك سر فريد.

أصغِ إلى همس الصحراء في الليل،
حيث الصمت يغدو نغماً وسلام،
يسري الدفء في عروق الخيل،
وينام الكون في حضن الغمام.`,
            milestones: [
                'تأملت في جمال الأبيات ووصف الرمال الذهبية',
                'فهمت معنى همس الصحراء وصمتها في الليل',
                'أكملت قراءة القصيدة وأدركت عمق الرابط بين الصحراء والتاريخ'
            ],
            attachments: []
        },
        {
            id: 'work-5',
            title: 'خواب اور حقیقت کا سفر',
            author: 'مرزا اسد اللہ',
            category: 'essays',
            language: 'urdu',
            readTime: 3,
            date: 'May 22, 2026',
            cover: './assets/images/1455390582262.jpg',
            excerpt: 'ایک فلسفیانہ مضمون جو انسانی خوابوں، حقیقت کی تلخیوں اور ان کے باہمی تعلق پر روشنی ڈالتا ہے۔',
            body: `انسانی زندگی خوابوں اور حقیقت کے درمیان ایک مسلسل کشمکش کا نام ہے۔ خواب ہمیں جینے کا حوصلہ دیتے ہیں، جبکہ حقیقت ہمیں زمین پر رہنے کا سبق سکھاتی ہے۔

جب ہم اپنی آنکھیں بند کرتے ہیں، تو ایک نئی دنیا تخلیق ہوتی ہے جہاں کوئی حد نہیں ہوتی۔ لیکن جیسے ہی صبح کا سورج طلوع ہوتا ہے، حقیقت کا بے رحم اجالا ہمیں اپنے فرائض کی یاد دلاتا ہے۔

ایک سچے تخلیق کار کا کام یہ ہے کہ وہ خوابوں کے رنگوں سے حقیقت کے کینوس پر ایک خوبصورت تصویر بنائے۔ جب ہم ان دونوں کے درمیان توازن پیدا کر لیتے ہیں، تو زندگی ایک حسین نغمہ بن جاتی ہے۔`,
            milestones: [
                'زندگی، خواب اور حقیقت کے درمیان کشمکش پر غور کیا',
                'خوابوں اور حقیقت کے درمیان توازن کی اہمیت کو سمجھا',
                'مضمون مکمل کیا اور انسانی خوابوں کے فلسفے کو جانا'
            ],
            attachments: []
        },
        {
            id: 'work-6',
            title: 'धरा और अंबर का मिलन',
            author: 'रवींद्रनाथ वर्मा',
            category: 'poetry',
            language: 'hindi',
            readTime: 2,
            date: 'May 20, 2026',
            cover: './assets/images/1518156677180.jpg',
            excerpt: 'क्षितिज पर धरती और आकाश के मिलन को दर्शाती एक सुंदर कविता, जो प्रेम और शाश्वत मिलन की बात करती है।',
            body: `क्षितिज की उस धुंधली रेखा पर,
जहाँ मिलते दिखते धरती और गगन,
एक मौन निमंत्रण देता है,
यह युग-युगांतर का पावन मिलन।

धरा बिछाती हरी दूब की चादर,
अंबर फैलाता अपना नील वितान,
दोनों शांत खड़े मुस्काते हैं,
गाते जीवन का अमर गान।

कोई नहीं पहुँच पाया उस पार,
जहाँ सच में होता इनका मेल,
फिर भी यह आशा बनी रहती,
सृष्टि का यह कितना सुंदर खेल।`,
            milestones: [
                'क्षितिज पर धरती और गगन के मिलन की कल्पना की',
                'हरी दूब की चादर और नील वितान के प्रतीकों को समझा',
                'कविता पूर्ण की और शाश्वत प्रेम के भाव को महसूस किया'
            ],
            attachments: []
        },
        {
            id: 'work-7',
            title: 'നീലഗിരിയുടെ മടിത്തട്ടിൽ',
            author: 'മാധവൻ നായർ',
            category: 'poetry',
            language: 'malayalam',
            readTime: 2,
            date: 'May 24, 2026',
            cover: './assets/images/1516979187457.jpg',
            excerpt: 'നീലഗിരി കുന്നുകളുടെ സൗന്ദര്യവും കാറ്റിന്റെ ഈണവും വർണ്ണിക്കുന്ന മനോഹരമായ ഒരു കവിത.',
            body: `നീലഗിരി കുന്നുകളിൽ പൂക്കും നീലക്കുറിഞ്ഞികൾ,
കാറ്റിന്റെ ഈണത്തിൽ ആടിയുലയുന്നു,
മഞ്ഞിൻ കണങ്ങൾ തലോടും പുലരിയിൽ,
പ്രകൃതി ഒരുക്കും ഒരു സ്വപ്നഭൂമി.

പച്ചപ്പട്ടുടുത്ത താഴ്‌വരകൾ സാക്ഷി,
നിശബ്ദതയിൽ ഒഴുകുന്ന അരുവികൾ സാക്ഷി,
ഈ സൗന്ദര്യം നുകരാൻ എത്തുന്ന പക്ഷികൾ,
തങ്ങളുടെ മധുരഗീതം ആലപിക്കുന്നു.

കാലം മാറിയാലും ഈ മണ്ണ് മാറുകില്ല,
ഇവിടുത്തെ മരച്ചില്ലകളിലെ തണൽ മാറുകില്ല,
ഹൃദയത്തിൽ സൂക്ഷിക്കാം ഈ മനോഹര ചിത്രം,
ഓർമ്മകളിൽ എന്നും തിളങ്ങിനിൽക്കാൻ.`,
            milestones: [
                'നീലഗിരി കുന്നുകളുടെയും കുറിഞ്ഞിപ്പൂക്കളുടെയും ഭംഗി ആസ്വദിച്ചു',
                'താഴ്‌വരകളുടെയും അരുവികളുടെയും നിശബ്ദതയെക്കുറിച്ച് ചിന്തിച്ചു',
                'കവിത പൂർത്തിയാക്കി പ്രകൃതിയുടെ നിത്യഹരിത ഭംഗി അനുഭവിച്ചു'
            ],
            attachments: []
        },
        {
            id: 'work-8',
            title: 'അത് നിങ്ങളായിരുന്നെങ്കിൽ',
            author: 'Anshith',
            category: 'short-stories',
            language: 'malayalam',
            readTime: 3,
            date: 'May 24, 2026',
            cover: './assets/images/1455390582262.jpg',
            excerpt: 'ജാസിം എന്ന കുട്ടിയുടെ ജീവിതത്തിലെ ഒരു പ്രഭാതവും അവൻ കാണുന്ന ചില സ്വപ്നങ്ങളും യാഥാർത്ഥ്യങ്ങളും വിവരിക്കുന്ന ഒരു ചെറുകഥ.',
            body: `രാവിൻറെ കൂരിരുട്ട് ആകെ പരന്നുകഴിഞിരുന്നു .യാതൊരു മുന്നറിയിപ്പുമില്ലാതെ കയറിവന്ന ഉറക്കത്തെ അവന് തട്ടിയകറ്റാൻ കഴിന്നില്ല ഇന്ന് അവന്റെ പിറന്നാളാണ് സ്കൂളിൽ കുട്ടികൾക്കൊക്കെ മിട്ടായി കൊടുക്കുകയാണ് എല്ലാവരും അവനെ ഒരു ചെറു പുഞ്ചിരിയോടെ കടത്തിവിട്ടു ബെല്ലടിച്ചു അവൻ വീട്ടിലേക്ക് നടന്നു അവനെ കൊണ്ടുപോകാൻ ആരും വന്നില്ല കാരണം അവന് ചെറുപ്പത്തിൽ തന്നെ തന്റെ ഉപ്പയെ നഷ്ടപ്പെട്ടിരുന്നു കാല്നടക്കാരുടെ ചവിട്ടുകൊണ്ട് മുരടിച്ച പുല്ലുകൾ അവന് ഒരു വഴികാട്ടിയെ പോലെ പ്രവർത്തിച്ചു "ജാസിമേ നീച്ചേ,മദറസ്ക്ക് പോണ്ടേ ആറുമണിയായി" ഉമ്മ അക്ഷമയോടെ വിളിച്ചുകൊണ്ടിരുന്നു ജാസിം ഞെട്ടിയുണർന്നു ഇതൊക്കെ സ്വപ്നമായിരുന്നോ ജാസിം പിറുപിറുത്തു "എന്താണ് ഇജ് പറയ്ണ്" ഉമ്മ ചോദിച്ചു "ഒന്നുല്ല" ജാസിം വേഗം ബാത്റൂമിലേക്ക് ഓടി.

"ഉമ്മ അസ്സലാമുഅലയ്കും ഞാൻ പോവാണ്" അവൻ വിളിച്ചുപറഞ്ഞു "വേഗം പൊയ്ക്കോ" അടുക്കളയിൽനിന്ന് ഉമ്മ മറുപടി പറഞ്ഞു മദ്രറസയിൽ എത്തിയ ജാസിം ആദ്യം തന്നെ കേട്ടത് ചെലവ് ചെലവ് എന്ന വാക്കുകളാണ് അബൂബക്കർ ഉസ്താദ് എത്തിയതും എല്ലാവരും നിശബ്ദരായി ഒരു ശോകമൂകമായ അന്തരീക്ഷം പോലെ`,
            milestones: [
                'ജാസിമിന്റെ പിറന്നാൾ സ്വപ്നത്തെക്കുറിച്ച് വായിക്കുക',
                'ജാസിമും ഉമ്മയും തമ്മിലുള്ള സംഭാഷണം മനസ്സിലാക്കുക',
                'മദ്രസയിലെ അന്തരീക്ഷം അറിഞ്ഞ് കഥ പൂർത്തിയാക്കുക'
            ],
            attachments: []
        }
    ];

    // Preset Cover Photos for the Editor (Unsplash links)
    const coverPresets = [
        { name: 'Poetry Cosmic', url: './assets/images/1518156677180.jpg' },
        { name: 'Story Steampunk', url: './assets/images/1516979187457.jpg' },
        { name: 'Essay Ink', url: './assets/images/1455390582262.jpg' },
        { name: 'SciFi Neon', url: './assets/images/1509198397868.jpg' }
    ];

    // Default Pre-loaded critiques (comments) synced by story ID
    const defaultComments = {
        'work-1': [
            { id: 'c1', author: 'Loomis Reed', role: 'Critic', body: 'The rhythmic pacing here feels incredibly precise, mimicking a clockwork loop. The glowing lines metaphor really binds the science theme to classic verse.', timestamp: '2 days ago', upvotes: 14 },
            { id: 'c2', author: 'Dr. Evelyn Gray', role: 'Scholar', body: 'Excellent use of caesura. The grid imagery stands out and speaks to our digital isolation.', timestamp: '1 day ago', upvotes: 9 }
        ],
        'work-2': [
            { id: 'c3', author: 'Penny Sprocket', role: 'Reader', body: 'I love Barnaby! The descriptions of copper sands and steam fountain are visual candy. I want a sequel!', timestamp: '3 days ago', upvotes: 21 }
        ],
        'work-3': [
            { id: 'c4', author: 'Arthur Wilde', role: 'Essayist', body: 'Writing is indeed a negotiation with silence. This piece captures the writerly angst and peacefulness beautifully.', timestamp: '1 week ago', upvotes: 18 }
        ]
    };

    // -----------------------------------------------------------------
    // Initialization & LocalStorage Data Retrieval
    // -----------------------------------------------------------------
    let articles = JSON.parse(localStorage.getItem('as_articles'));
    if (!articles) {
        articles = defaultArticles;
        localStorage.setItem('as_articles', JSON.stringify(articles));
    } else {
        let migrated = false;
        articles.forEach(art => {
            if (!art.language) {
                art.language = 'english';
                migrated = true;
            }
            if (!art.attachments) {
                const defaultArt = defaultArticles.find(d => d.id === art.id);
                art.attachments = defaultArt ? defaultArt.attachments : [];
                migrated = true;
            }
        });
        if (migrated) {
            localStorage.setItem('as_articles', JSON.stringify(articles));
        }
    }

    let comments = JSON.parse(localStorage.getItem('as_comments'));
    if (!comments) {
        comments = defaultComments;
        localStorage.setItem('as_comments', JSON.stringify(comments));
    }

    let selectedCoverUrl = coverPresets[0].url;
    let selectedAttachments = [];
    let activeArticle = null;
    let currentCategoryFilter = 'all';
    let currentLanguageFilter = 'all';
    let cameraStream = null;

    // UI Cache Elements
    const feedView = document.getElementById('feedView');
    const readerView = document.getElementById('readerView');
    const literatureGrid = document.getElementById('literatureGrid');
    const searchInput = document.getElementById('searchInput');
    const filterTags = document.getElementById('filterTags');
    const languageTags = document.getElementById('headerLanguageTags');
    const writerModal = document.getElementById('writerModal');
    
    // Modal buttons
    const headerWriteBtn = document.getElementById('headerWriteBtn');
    const sidebarWriteBtn = document.getElementById('sidebarWriteBtn');
    const closeWriterModalBtn = document.getElementById('closeWriterModalBtn');
    const publishBtn = document.getElementById('publishBtn');

    // Reader UI Cache
    const backToFeedBtn = document.getElementById('backToFeedBtn');
    const readerCategory = document.getElementById('readerCategory');
    const readerTitle = document.getElementById('readerTitle');
    const readerAuthor = document.getElementById('readerAuthor');
    const readerDate = document.getElementById('readerDate');
    const readerTime = document.getElementById('readerTime');
    const readerBody = document.getElementById('readerBody');
    const takeawaysList = document.getElementById('takeawaysList');
    const progressLabel = document.getElementById('takeawayProgress');
    const takeawaysHeader = document.getElementById('takeawaysHeader');
    const takeawaysBox = document.getElementById('takeawaysBox');

    // Sidebar & Navigation Cache
    const sidebarTotalWorks = document.getElementById('sidebarTotalWorks');
    const sidebarCritiqueList = document.getElementById('sidebarCritiqueList');
    const navHomeLink = document.getElementById('navHomeLink');

    // Theme Switcher Cache
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    const bodyElement = document.body;

    // Toast
    const toast = document.getElementById('toast');

    // Custom Cover & Camera Cache
    const storyCustomCover = document.getElementById('storyCustomCover');
    const storyCoverFile = document.getElementById('storyCoverFile');
    const storyCoverBrowseBtn = document.getElementById('storyCoverBrowseBtn');
    const storyCoverCameraBtn = document.getElementById('storyCoverCameraBtn');
    const cameraModal = document.getElementById('cameraModal');
    const cameraVideo = document.getElementById('cameraVideo');
    const cameraLoading = document.getElementById('cameraLoading');
    const cameraCaptureBtn = document.getElementById('cameraCaptureBtn');
    const closeCameraModal = document.getElementById('closeCameraModal');

    // Editor / Admin Cache & State
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminToolbar = document.getElementById('adminToolbar');
    const adminSettingsBtn = document.getElementById('adminSettingsBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const adminLoginSubmitBtn = document.getElementById('adminLoginSubmitBtn');
    const adminLoginError = document.getElementById('adminLoginError');
    const closeAdminLoginModal = document.getElementById('closeAdminLoginModal');

    const adminSettingsModal = document.getElementById('adminSettingsModal');
    const oldPasswordInput = document.getElementById('oldPasswordInput');
    const newPasswordInput = document.getElementById('newPasswordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const passwordChangeError = document.getElementById('passwordChangeError');
    const passwordChangeSuccess = document.getElementById('passwordChangeSuccess');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const closeAdminSettingsModal = document.getElementById('closeAdminSettingsModal');

    // Moderation alert and sidebar controls
    const moderatorAlertBar = document.getElementById('moderatorAlertBar');
    const pendingCountText = document.getElementById('pendingCountText');
    const openModerationBtn = document.getElementById('openModerationBtn');
    const sidebarWriteCard = document.getElementById('sidebarWriteCard');

    // Delete confirmation modal elements
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    const deleteCancelBtn = document.getElementById('deleteCancelBtn');
    const deleteConfirmBtn = document.getElementById('deleteConfirmBtn');
    const deleteConfirmText = document.getElementById('deleteConfirmText');
    const closeDeleteModal = document.getElementById('closeDeleteModal');

    // Initialize password and login states
    let editorPassword = localStorage.getItem('as_editor_pw');
    if (!editorPassword) {
        editorPassword = 'hira15';
        localStorage.setItem('as_editor_pw', editorPassword);
    }
    
    let isEditorLoggedIn = localStorage.getItem('as_editor_active') === 'true';
    let postToDeleteId = null;
    let postToEditId = null; // tracking if we are editing an existing work in the workshop

    // -----------------------------------------------------------------
    // Theme Switcher Logic
    // -----------------------------------------------------------------
    const savedTheme = localStorage.getItem('theme') || 'dark';
    bodyElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = bodyElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        bodyElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
    });

    function updateThemeUI(theme) {
        if (theme === 'dark') {
            themeText.textContent = 'Light Mode';
            themeIcon.innerHTML = `
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            `;
        } else {
            themeText.textContent = 'Dark Mode';
            themeIcon.innerHTML = `
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            `;
        }
    }

    // -----------------------------------------------------------------
    // Editor / Admin Authentication & Interface Control
    // -----------------------------------------------------------------
    function showDashboardLoading(text, duration, callback) {
        const overlay = document.getElementById('dashboardLoadingOverlay');
        const loadingText = document.getElementById('dashboardLoadingText');
        const refreshBtn = document.getElementById('dashboardRefreshBtn');

        if (overlay) {
            if (loadingText) {
                loadingText.textContent = text;
            }
            overlay.style.display = 'flex';
        }

        if (refreshBtn) {
            refreshBtn.classList.add('spinning');
        }

        setTimeout(() => {
            if (overlay) {
                overlay.style.display = 'none';
            }
            if (refreshBtn) {
                refreshBtn.classList.remove('spinning');
            }
            if (typeof callback === 'function') {
                callback();
            }
        }, duration);
    }

    function updateEditorUI() {
        const dashboardLoggedOut = document.getElementById('dashboardLoggedOut');
        const dashboardLoggedIn = document.getElementById('dashboardLoggedIn');
        const dashboardPendingCount = document.getElementById('dashboardPendingCount');
        const dashboardPublishedCount = document.getElementById('dashboardPublishedCount');
        
        const pendingCount = articles.filter(art => art.status === 'pending').length;
        const approvedCount = articles.filter(art => !art.status || art.status === 'approved').length;

        if (isEditorLoggedIn) {
            adminLoginBtn.style.display = 'none';
            adminToolbar.style.display = 'flex';
            sidebarWriteCard.style.display = 'block';
            
            // Show moderator alert bar if pending drafts exist
            if (pendingCount > 0) {
                moderatorAlertBar.style.display = 'flex';
                pendingCountText.textContent = `${pendingCount} draft${pendingCount === 1 ? '' : 's'}`;
            } else {
                moderatorAlertBar.style.display = 'none';
            }

            if (dashboardLoggedOut) dashboardLoggedOut.style.display = 'none';
            if (dashboardLoggedIn) {
                dashboardLoggedIn.style.display = 'block';
                if (dashboardPendingCount) dashboardPendingCount.textContent = pendingCount;
                if (dashboardPublishedCount) dashboardPublishedCount.textContent = approvedCount;
            }
        } else {
            adminLoginBtn.style.display = 'inline-flex';
            adminToolbar.style.display = 'none';
            sidebarWriteCard.style.display = 'none';
            moderatorAlertBar.style.display = 'none';

            if (dashboardLoggedOut) dashboardLoggedOut.style.display = 'block';
            if (dashboardLoggedIn) dashboardLoggedIn.style.display = 'none';
        }
        
        // Refresh ticker, sidebar widgets, and grid
        updateTicker();
        renderPendingWidget();
    }

    // Open Login Modal
    adminLoginBtn.addEventListener('click', () => {
        adminPasswordInput.value = '';
        adminLoginError.style.display = 'none';
        adminLoginModal.classList.add('active');
        adminPasswordInput.focus();
    });

    // Close Login Modal
    closeAdminLoginModal.addEventListener('click', () => {
        adminLoginModal.classList.remove('active');
    });

    adminLoginModal.addEventListener('click', (e) => {
        if (e.target === adminLoginModal) {
            adminLoginModal.classList.remove('active');
        }
    });

    // Login Action
    function submitEditorLogin() {
        const enteredPw = adminPasswordInput.value.trim();
        if (enteredPw.toLowerCase() === editorPassword.toLowerCase()) {
            isEditorLoggedIn = true;
            localStorage.setItem('as_editor_active', 'true');
            adminLoginModal.classList.remove('active');
            updateEditorUI();
            showDashboardLoading("Authenticating...", 150, () => {
                renderFeed(); // Re-render grid to show delete buttons if logged in
                showToast('Editor Mode unlocked successfully!');
            });
        } else {
            adminLoginError.style.display = 'block';
        }
    }

    adminLoginSubmitBtn.addEventListener('click', submitEditorLogin);
    adminPasswordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            submitEditorLogin();
        }
    });

    // Logout Action
    adminLogoutBtn.addEventListener('click', () => {
        showDashboardLoading("Signing out...", 150, () => {
            isEditorLoggedIn = false;
            localStorage.setItem('as_editor_active', 'false');
            updateEditorUI();
            renderFeed(); // Re-render grid to hide delete buttons
            showToast('Logged out of Editor Mode.');
            if (activeArticle) {
                openArticle(activeArticle.id); // re-open to hide article edit/delete controls
            }
        });
    });

    // Open Settings Modal
    adminSettingsBtn.addEventListener('click', () => {
        oldPasswordInput.value = '';
        newPasswordInput.value = '';
        confirmPasswordInput.value = '';
        passwordChangeError.style.display = 'none';
        passwordChangeSuccess.style.display = 'none';
        adminSettingsModal.classList.add('active');
    });

    // Close Settings Modal
    closeAdminSettingsModal.addEventListener('click', () => {
        adminSettingsModal.classList.remove('active');
    });

    adminSettingsModal.addEventListener('click', (e) => {
        if (e.target === adminSettingsModal) {
            adminSettingsModal.classList.remove('active');
        }
    });

    // Update Password Action
    changePasswordBtn.addEventListener('click', () => {
        const oldPw = oldPasswordInput.value.trim();
        const newPw = newPasswordInput.value.trim();
        const confirmPw = confirmPasswordInput.value.trim();

        if (oldPw.toLowerCase() !== editorPassword.toLowerCase()) {
            passwordChangeError.textContent = 'Incorrect current password.';
            passwordChangeError.style.display = 'block';
            passwordChangeSuccess.style.display = 'none';
            return;
        }
        if (!newPw) {
            passwordChangeError.textContent = 'New password cannot be empty.';
            passwordChangeError.style.display = 'block';
            passwordChangeSuccess.style.display = 'none';
            return;
        }
        if (newPw !== confirmPw) {
            passwordChangeError.textContent = 'New passwords do not match.';
            passwordChangeError.style.display = 'block';
            passwordChangeSuccess.style.display = 'none';
            return;
        }

        editorPassword = newPw;
        localStorage.setItem('as_editor_pw', editorPassword);
        passwordChangeError.style.display = 'none';
        passwordChangeSuccess.style.display = 'block';

        showToast('Editor password updated.');
        setTimeout(() => {
            adminSettingsModal.classList.remove('active');
        }, 1500);
    });

    // Hook up moderation alert review button
    if (openModerationBtn) {
        openModerationBtn.addEventListener('click', () => {
            const pendingCard = document.getElementById('sidebarPendingCard');
            if (pendingCard) {
                pendingCard.scrollIntoView({ behavior: 'smooth' });
                pendingCard.classList.add('glow-border-orange');
                setTimeout(() => {
                    pendingCard.classList.remove('glow-border-orange');
                }, 2000);
            }
        });
    }

    // Call update UI to synchronize on launch
    setTimeout(() => {
        updateEditorUI();
    }, 0);


    // -----------------------------------------------------------------
    // Dynamic Ticker Text
    // -----------------------------------------------------------------
    function updateTicker() {
        const defaultTickerItems = [
            `Total library works: ${articles.length} pieces published.`,
            `Decentralized critiques online: ${Object.values(comments).flat().length} active reviews.`,
            `Write &amp; publish now. Hira Beacon offers free layout tools with orange glowing linings.`
        ];
        const tickerContent = document.getElementById('tickerContent');
        if (tickerContent) {
            tickerContent.innerHTML = defaultTickerItems.map(item => `<div class="ticker-item">${item}</div>`).join('');
        }
    }

    // -----------------------------------------------------------------
    // Feed & Grid Rendering
    // -----------------------------------------------------------------
    function renderFeed() {
        const searchQuery = searchInput.value.trim().toLowerCase();
        
        // Filter articles - only show approved ones
        const filtered = articles.filter(art => {
            const isApproved = !art.status || art.status === 'approved';
            const matchesCategory = currentCategoryFilter === 'all' || art.category === currentCategoryFilter;
            
            const artLanguage = art.language || 'english';
            const matchesLanguage = currentLanguageFilter === 'all' || artLanguage === currentLanguageFilter;
            
            const matchesSearch = art.title.toLowerCase().includes(searchQuery) ||
                                  art.author.toLowerCase().includes(searchQuery) ||
                                  art.excerpt.toLowerCase().includes(searchQuery);
            return isApproved && matchesCategory && matchesLanguage && matchesSearch;
        });

        // Generate Cards
        let gridHtml = '';

        // Add the special "Publish a Story" card if no search filter is active
        if (searchQuery === '' && currentCategoryFilter === 'all' && currentLanguageFilter === 'all') {
            gridHtml += `
                <div class="publish-cta-card" id="gridCtaCard">
                    <div class="publish-cta-icon">✎</div>
                    <h4 class="card-title glow-text" style="color: var(--glow-orange-bright);">Writer's Workshop</h4>
                    <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 20px;">Publish your own masterpiece directly onto the feed. Fully styled with glowing orange neon frames.</p>
                    <span class="btn-teal glow-border-orange" style="padding: 10px 20px; font-size: 14px;">Open Canvas</span>
                </div>
            `;
        }

        // Render remaining article cards
        if (filtered.length === 0) {
            gridHtml += `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">
                    <h3>No literature found</h3>
                    <p style="margin-top: 10px;">Try clearing your filters or writing your own story!</p>
                </div>
            `;
        } else {
            filtered.forEach(art => {
                const deleteBtnHtml = isEditorLoggedIn ? `
                    <button class="card-delete-btn" data-id="${art.id}" title="Delete this work">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                ` : '';

                const artLang = art.language || 'english';
                const isRtl = artLang === 'arabic' || artLang === 'urdu';
                const rtlAttr = isRtl ? 'dir="rtl"' : '';

                gridHtml += `
                    <div class="literature-card" data-id="${art.id}" ${rtlAttr}>
                        <div class="card-cover" style="background-image: url('${art.cover}')">
                            <div class="card-cover-overlay"></div>
                            <span class="card-category">${art.category.replace('-', ' ')}</span>
                            ${deleteBtnHtml}
                        </div>
                        <div class="card-content">
                            <h4 class="card-title">${art.title}</h4>
                            <p class="card-excerpt">${art.excerpt}</p>
                            <div class="card-meta">
                                <span class="card-author">By ${art.author}</span>
                                <span>${art.readTime} min read</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        literatureGrid.innerHTML = gridHtml;

        // Add events to dynamically added cards
        document.querySelectorAll('.literature-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                openArticle(id);
            });
        });

        // Add events to card delete buttons
        if (isEditorLoggedIn) {
            document.querySelectorAll('.card-delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation(); // prevent opening the reader view
                    const id = btn.getAttribute('data-id');
                    confirmDeleteArticle(id);
                });
            });
        }

        // Add event to Grid CTA card
        const gridCta = document.getElementById('gridCtaCard');
        if (gridCta) {
            gridCta.addEventListener('click', openWriterWorkshop);
        }

        // Update stats (only count approved works)
        const approvedCount = articles.filter(art => !art.status || art.status === 'approved').length;
        sidebarTotalWorks.textContent = approvedCount;
        
        updateTicker();
        renderPendingWidget();
    }

    function renderPendingWidget() {
        const pendingArticles = articles.filter(art => art.status === 'pending');
        const pendingCard = document.getElementById('sidebarPendingCard');
        const pendingList = document.getElementById('sidebarPendingList');
        
        if (!pendingCard || !pendingList) return;

        if (!isEditorLoggedIn || pendingArticles.length === 0) {
            pendingCard.style.display = 'none';
            return;
        }

        pendingCard.style.display = 'block';
        pendingList.innerHTML = pendingArticles.map(art => `
            <li class="feed-item" style="display: flex; flex-direction: column; gap: 5px; padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid var(--border-color);">
                <div style="font-weight: 700; font-size: 13px; color: var(--text-primary); line-height: 1.35;">${art.title}</div>
                <div style="font-size: 11px; color: var(--text-secondary);">By ${art.author}</div>
                <button class="btn-approve-simulated" data-id="${art.id}" style="align-self: flex-start; background-color: var(--glow-orange); color: white; border: none; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; cursor: pointer; margin-top: 4px; box-shadow: 0 0 5px var(--glow-orange-dim); transition: all 0.2s ease;">
                    Approve Draft
                </button>
            </li>
        `).join('');

        // Wire up approve buttons
        pendingList.querySelectorAll('.btn-approve-simulated').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                approveArticle(id);
            });
        });
    }

    function approveArticle(id) {
        const artIndex = articles.findIndex(a => a.id === id);
        if (artIndex === -1) return;

        showDashboardLoading("Approving draft...", 150, () => {
            articles[artIndex].status = 'approved';
            localStorage.setItem('as_articles', JSON.stringify(articles));

            // Re-render feed and pending widget
            renderFeed();
            showToast(`"${articles[artIndex].title}" approved and published successfully!`);
        });
    }

    // Category filter clicking
    filterTags.addEventListener('click', (e) => {
        const tag = e.target.closest('.filter-tag');
        if (!tag) return;

        filterTags.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        
        currentCategoryFilter = tag.getAttribute('data-category');
        renderFeed();
    });

    // Language filter clicking
    if (languageTags) {
        languageTags.addEventListener('click', (e) => {
            const tag = e.target.closest('.lang-nav-item');
            if (!tag) return;

            languageTags.querySelectorAll('.lang-nav-item').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            
            currentLanguageFilter = tag.getAttribute('data-language');
            renderFeed();
        });
    }

    // Search bar keystrokes
    searchInput.addEventListener('input', renderFeed);

    // -----------------------------------------------------------------
    // Reader View Control
    // -----------------------------------------------------------------
    function openArticle(id) {
        const art = articles.find(a => a.id === id);
        if (!art) return;

        activeArticle = art;
        
        // Hide Feed, Show Reader
        feedView.style.display = 'none';
        readerView.style.display = 'flex';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Update fields
        readerTitle.textContent = art.title;
        readerAuthor.textContent = art.author;
        readerCategory.textContent = art.category.replace('-', ' ');
        readerDate.textContent = art.date || 'Published May 21, 2026';
        readerTime.textContent = `${art.readTime} min read`;

        // Check language of article for RTL layout or custom fonts
        const artLang = art.language || 'english';
        const isRtl = artLang === 'arabic' || artLang === 'urdu';
        
        const articleElement = readerView.querySelector('article');
        if (articleElement) {
            if (isRtl) {
                articleElement.setAttribute('dir', 'rtl');
                articleElement.style.textAlign = 'right';
            } else {
                articleElement.removeAttribute('dir');
                articleElement.style.textAlign = '';
            }
        }

        // Format body text
        const paragraphs = art.body.split('\n\n').filter(p => p.trim() !== '');
        let bodyHtml = '';
        if (isRtl) {
            readerBody.setAttribute('dir', 'rtl');
            readerBody.style.textAlign = 'right';
            readerBody.style.fontFamily = '"Lora", "Noto Naskh Arabic", "Noto Nastaliq Urdu", serif';
            
            paragraphs.forEach((p) => {
                bodyHtml += `<p style="font-size: 20px; line-height: 1.95; margin-bottom: 25px;">${p.replace(/\n/g, '<br>')}</p>`;
            });
        } else {
            readerBody.removeAttribute('dir');
            readerBody.style.textAlign = '';
            
            if (artLang === 'malayalam') {
                readerBody.style.fontFamily = '"Lora", "Noto Sans Malayalam", serif';
            } else {
                readerBody.style.fontFamily = '';
            }
            
            paragraphs.forEach((p, idx) => {
                if (idx === 0) {
                    bodyHtml += `<p class="lead">${p}</p>`;
                } else {
                    bodyHtml += `<p>${p.replace(/\n/g, '<br>')}</p>`;
                }
            });
        }
        readerBody.innerHTML = bodyHtml;

        // Render reading milestones checklist
        const defaultMilestones = [
            'Delved into the introductory concepts of this piece',
            'Crossed the middle-point and analyzed the writer\'s craft',
            'Completed the entire reading of this creative publication'
        ];
        const milestones = art.milestones || defaultMilestones;
        
        takeawaysList.innerHTML = milestones.map((text, idx) => `
            <li class="takeaway-item">
                <div class="takeaway-checkbox" data-index="${idx}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <div class="takeaway-text">${text}</div>
            </li>
        `).join('');

        // Expand/Collapse reading milestones
        takeawaysBox.classList.remove('collapsed');
        progressLabel.textContent = '0% Done';
        progressLabel.style.color = 'var(--highlight-gold)';
        progressLabel.style.backgroundColor = 'transparent';
        progressLabel.style.padding = '0';

        // Checkbox events
        const checkboxes = takeawaysList.querySelectorAll('.takeaway-checkbox');
        checkboxes.forEach(box => {
            box.addEventListener('click', (e) => {
                e.stopPropagation();
                box.classList.toggle('checked');
                updateReaderProgress(checkboxes);
            });
        });

        // Initialize progress bar
        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = '0%';

        // Stop narrator if playing from other stories
        stopSpeaking();

        // Render Editor Actions in Reader View if logged in
        let adminActions = document.getElementById('readerAdminActions');
        if (adminActions) adminActions.remove(); // Clear previous toolbar

        if (isEditorLoggedIn) {
            adminActions = document.createElement('div');
            adminActions.id = 'readerAdminActions';
            adminActions.style.cssText = 'display:flex; gap:12px; margin-top: 15px; margin-bottom: 25px; padding: 12px; background: var(--background-grey); border-radius: 8px; border: 1.5px solid var(--border-color);';
            adminActions.innerHTML = `
                <button id="readerEditBtn" class="btn-teal" style="padding: 8px 16px; font-size: 13px; background-color: var(--glow-orange); border-radius: 6px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    Edit Work
                </button>
                <button id="readerDeleteBtn" class="btn-outlined" style="padding: 8px 16px; font-size: 13px; color: var(--danger-red); border-color: var(--danger-red); background: transparent; border-radius: 6px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    Delete Work
                </button>
            `;
            const header = readerView.querySelector('.article-header');
            if (header) {
                header.appendChild(adminActions);
            }

            // Wire events
            document.getElementById('readerEditBtn').addEventListener('click', () => {
                editArticle(art.id);
            });
            document.getElementById('readerDeleteBtn').addEventListener('click', () => {
                confirmDeleteArticle(art.id);
            });
        }

        // Render attachments
        const attachmentsBox = document.getElementById('attachmentsBox');
        const readerAttachmentsGrid = document.getElementById('readerAttachmentsGrid');
        if (attachmentsBox && readerAttachmentsGrid) {
            if (art.attachments && art.attachments.length > 0) {
                attachmentsBox.style.display = 'block';
                readerAttachmentsGrid.innerHTML = art.attachments.map((att, idx) => {
                    const typeClass = getAttachmentClass(att.type, att.name);
                    let iconSvg = '';
                    if (typeClass === 'type-pdf') {
                        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
                    } else if (typeClass === 'type-word') {
                        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`;
                    } else if (typeClass === 'type-excel') {
                        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line></svg>`;
                    } else if (typeClass === 'type-zip') {
                        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><path d="M12 11v4"></path><path d="M10 13h4"></path></svg>`;
                    } else {
                        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;
                    }

                    return `
                        <div class="attachment-card" data-index="${idx}">
                            <div class="attachment-icon-column">
                                <div class="attachment-icon-wrapper ${typeClass}">
                                    ${iconSvg}
                                </div>
                            </div>
                            <div class="attachment-info-column">
                                <div class="attachment-name" title="${escapeHTML(att.name)}">${escapeHTML(att.name)}</div>
                                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                                    <span class="attachment-size">${formatFileSize(att.size)}</span>
                                    <button class="attachment-download-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                // Wire download events
                readerAttachmentsGrid.querySelectorAll('.attachment-card').forEach(card => {
                    card.addEventListener('click', (e) => {
                        const index = parseInt(card.getAttribute('data-index'));
                        const att = art.attachments[index];
                        if (att) {
                            downloadAttachment(att);
                        }
                    });
                });
            } else {
                attachmentsBox.style.display = 'none';
                readerAttachmentsGrid.innerHTML = '';
            }
        }

        // Render Comments specific to this article
        renderComments();
    }

    function updateReaderProgress(checkboxes) {
        const total = checkboxes.length;
        const checked = takeawaysList.querySelectorAll('.takeaway-checkbox.checked').length;
        const percent = Math.round((checked / total) * 100);
        progressLabel.textContent = `${percent}% Done`;
        
        // Sync global progress bar
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = `${percent}%`;
        }
        
        if (percent === 100) {
            progressLabel.style.color = '#fff';
            progressLabel.style.backgroundColor = 'var(--glow-orange)';
            progressLabel.style.padding = '2px 8px';
            progressLabel.style.borderRadius = '10px';
            showToast('Reading milestone achieved! Critique is highly welcomed.');
        } else {
            progressLabel.style.color = 'var(--highlight-gold)';
            progressLabel.style.backgroundColor = 'transparent';
            progressLabel.style.padding = '0';
        }
    }

    // Toggle milestones dropdown click
    takeawaysHeader.addEventListener('click', () => {
        takeawaysBox.classList.toggle('collapsed');
    });

    // Close reader view
    backToFeedBtn.addEventListener('click', () => {
        readerView.style.display = 'none';
        feedView.style.display = 'flex';
        activeArticle = null;
        stopSpeaking();
        
        // Reset scrollbars
        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = '0%';
        window.scrollTo({ top: 0, behavior: 'instant' });
    });

    // -----------------------------------------------------------------
    // Feed Reload Overlay Logic
    // -----------------------------------------------------------------
    const feedReloadBtn = document.getElementById('feedReloadBtn');
    const reloadBtnIcon = document.getElementById('reloadBtnIcon');
    const feedReloadOverlay = document.getElementById('feedReloadOverlay');
    
    function triggerFeedReload(callback) {
        if (reloadBtnIcon) {
            reloadBtnIcon.style.transform = 'rotate(360deg)';
            reloadBtnIcon.style.transition = 'transform 0.15s linear';
        }
        
        showSplashScreen(true, () => {
            if (reloadBtnIcon) {
                reloadBtnIcon.style.transform = 'none';
                reloadBtnIcon.style.transition = 'none';
            }
            if (typeof callback === 'function') {
                callback();
            }
        });
    }

    // Home link navigates back to library and reloads feed
    navHomeLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (activeArticle) {
            backToFeedBtn.click();
        }
        triggerFeedReload(() => {
            renderFeed();
        });
    });

    if (feedReloadBtn) {
        feedReloadBtn.addEventListener('click', () => {
            triggerFeedReload(() => {
                renderFeed();
            });
        });
    }

    // -----------------------------------------------------------------
    // CRUD Operations: Edit & Delete Functions
    // -----------------------------------------------------------------
    function editArticle(id) {
        const art = articles.find(a => a.id === id);
        if (!art) return;
        
        postToEditId = id;
        
        // Fill form with current values
        storyTitle.value = art.title;
        storyAuthor.value = art.author;
        storyCategory.value = art.category;
        if (storyLanguage) {
            storyLanguage.value = art.language || 'english';
        }
        storyReadTime.value = art.readTime;
        storyBody.value = art.body;
        
        const wordCount = art.body.trim() === '' ? 0 : art.body.split(/\s+/).length;
        editorWordCount.textContent = `${wordCount} words`;
        
        // Change publish button text to show editing status
        publishBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Save Changes
        `;
        
        selectedCoverUrl = art.cover;
        const isPreset = coverPresets.some(preset => preset.url === selectedCoverUrl);
        if (storyCustomCover) {
            storyCustomCover.value = isPreset ? '' : selectedCoverUrl;
        }
        selectedAttachments = art.attachments ? [...art.attachments] : [];
        renderEditorAttachments();
        renderPresetCovers();
        updateLivePreview();
        
        // Open the Writer's Workshop
        writerModal.classList.add('active');
    }

    function confirmDeleteArticle(id) {
        const art = articles.find(a => a.id === id);
        if (!art) return;
        
        postToDeleteId = id;
        deleteConfirmText.textContent = `Are you sure you want to permanently delete "${art.title}" by ${art.author}? This action cannot be undone.`;
        deleteConfirmModal.classList.add('active');
    }

    // Delete modal event listeners
    deleteCancelBtn.addEventListener('click', () => {
        deleteConfirmModal.classList.remove('active');
        postToDeleteId = null;
    });

    closeDeleteModal.addEventListener('click', () => {
        deleteConfirmModal.classList.remove('active');
        postToDeleteId = null;
    });

    deleteConfirmModal.addEventListener('click', (e) => {
        if (e.target === deleteConfirmModal) {
            deleteConfirmModal.classList.remove('active');
            postToDeleteId = null;
        }
    });

    deleteConfirmBtn.addEventListener('click', () => {
        if (!postToDeleteId) return;
        
        const art = articles.find(a => a.id === postToDeleteId);
        const title = art ? art.title : 'Work';
        const targetId = postToDeleteId;
        
        // Close modal and reset state immediately
        deleteConfirmModal.classList.remove('active');
        postToDeleteId = null;

        showDashboardLoading("Deleting work...", 150, () => {
            // Purge from storage and local state
            articles = articles.filter(a => a.id !== targetId);
            localStorage.setItem('as_articles', JSON.stringify(articles));
            
            // Update interface
            renderFeed();
            updateEditorUI();
            showToast(`"${title}" was permanently deleted.`);
            
            // If the reader is currently displaying the deleted work, close reader and return to feed
            if (activeArticle && activeArticle.id === targetId) {
                backToFeedBtn.click();
            }
        });
    });

    // -----------------------------------------------------------------
    // Writer's Workshop Modal Form & Live Preview
    // -----------------------------------------------------------------
    const storyTitle = document.getElementById('storyTitle');
    const storyAuthor = document.getElementById('storyAuthor');
    const storyCategory = document.getElementById('storyCategory');
    const storyLanguage = document.getElementById('storyLanguage');
    const storyReadTime = document.getElementById('storyReadTime');
    const storyBody = document.getElementById('storyBody');
    
    // Preview Cache
    const previewPlaceholder = document.getElementById('previewPlaceholder');
    const previewContent = document.getElementById('previewContent');
    const previewCategoryBadge = document.getElementById('previewCategoryBadge');
    const previewTitleText = document.getElementById('previewTitleText');
    const previewMetaText = document.getElementById('previewMetaText');
    const previewBodyText = document.getElementById('previewBodyText');
    const editorWordCount = document.getElementById('editorWordCount');
    const presetCoversGrid = document.getElementById('coverPresets');

    // Open/Close modal
    function openWriterWorkshop() {
        postToEditId = null; // Reset to create mode
        
        if (isEditorLoggedIn) {
            publishBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Publish Directly
            `;
        } else {
            publishBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Submit for Review
            `;
        }

        // Reset form
        storyTitle.value = '';
        storyAuthor.value = '';
        storyCategory.value = 'poetry';
        if (storyLanguage) {
            storyLanguage.value = 'english';
        }
        storyReadTime.value = '3';
        storyBody.value = '';
        editorWordCount.textContent = '0 words';
        if (storyCustomCover) {
            storyCustomCover.value = '';
        }
        
        // Set first cover as active
        selectedCoverUrl = coverPresets[0].url;
        selectedAttachments = [];
        renderEditorAttachments();
        renderPresetCovers();
        updateLivePreview();

        writerModal.classList.add('active');
    }

    function stopCamera() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
        }
        if (cameraVideo) {
            cameraVideo.srcObject = null;
        }
        if (cameraModal) {
            cameraModal.classList.remove('active');
        }
    }

    function closeWriterWorkshop() {
        writerModal.classList.remove('active');
        stopCamera();
    }

    headerWriteBtn.addEventListener('click', openWriterWorkshop);
    sidebarWriteBtn.addEventListener('click', openWriterWorkshop);
    closeWriterModalBtn.addEventListener('click', closeWriterWorkshop);

    // Sidebar Login Dashboard actions
    const sidebarLoginBtn = document.getElementById('sidebarLoginBtn');
    const dashboardWriteBtn = document.getElementById('dashboardWriteBtn');
    const dashboardSettingsBtn = document.getElementById('dashboardSettingsBtn');
    const dashboardLogoutBtn = document.getElementById('dashboardLogoutBtn');
    const dashboardRefreshBtn = document.getElementById('dashboardRefreshBtn');

    if (sidebarLoginBtn) {
        sidebarLoginBtn.addEventListener('click', () => {
            if (adminLoginBtn) adminLoginBtn.click();
        });
    }
    if (dashboardWriteBtn) {
        dashboardWriteBtn.addEventListener('click', openWriterWorkshop);
    }
    if (dashboardSettingsBtn) {
        dashboardSettingsBtn.addEventListener('click', () => {
            if (adminSettingsBtn) adminSettingsBtn.click();
        });
    }
    if (dashboardLogoutBtn) {
        dashboardLogoutBtn.addEventListener('click', () => {
            if (adminLogoutBtn) adminLogoutBtn.click();
        });
    }
    if (dashboardRefreshBtn) {
        dashboardRefreshBtn.addEventListener('click', () => {
            showDashboardLoading("Refreshing stats...", 150, () => {
                updateEditorUI();
                showToast("Dashboard stats refreshed.");
            });
        });
    }
    
    // Close on background click
    writerModal.addEventListener('click', (e) => {
        if (e.target === writerModal) {
            closeWriterWorkshop();
        }
    });

    // -----------------------------------------------------------------
    // Custom Cover Poster Upload & Webcam Capture Logic
    // -----------------------------------------------------------------
    if (storyCoverBrowseBtn && storyCoverFile) {
        storyCoverBrowseBtn.addEventListener('click', () => {
            storyCoverFile.click();
        });
    }

    if (storyCoverFile) {
        storyCoverFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target.result;
                    selectedCoverUrl = dataUrl;
                    if (storyCustomCover) {
                        storyCustomCover.value = dataUrl;
                        storyCustomCover.dispatchEvent(new Event('input'));
                    }
                    // Remove selection from preset cover thumbs
                    document.querySelectorAll('.preset-cover-thumb').forEach(thumb => {
                        thumb.classList.remove('selected');
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (storyCoverCameraBtn) {
        storyCoverCameraBtn.addEventListener('click', async () => {
            if (cameraModal) {
                cameraModal.classList.add('active');
            }
            if (cameraLoading) {
                cameraLoading.style.display = 'flex';
            }
            
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 640, height: 480 },
                    audio: false
                });
                cameraStream = stream;
                if (cameraVideo) {
                    cameraVideo.srcObject = stream;
                    cameraVideo.onloadedmetadata = () => {
                        if (cameraLoading) {
                            cameraLoading.style.display = 'none';
                        }
                    };
                }
            } catch (err) {
                console.error("Camera access error:", err);
                showToast("Failed to access camera. Please check permissions.");
                stopCamera();
            }
        });
    }

    if (closeCameraModal) {
        closeCameraModal.addEventListener('click', stopCamera);
    }

    if (cameraModal) {
        cameraModal.addEventListener('click', (e) => {
            if (e.target === cameraModal) {
                stopCamera();
            }
        });
    }

    if (cameraCaptureBtn) {
        cameraCaptureBtn.addEventListener('click', () => {
            if (!cameraStream || !cameraVideo) return;
            
            try {
                const canvas = document.createElement('canvas');
                canvas.width = cameraVideo.videoWidth || 640;
                canvas.height = cameraVideo.videoHeight || 480;
                const ctx = canvas.getContext('2d');
                
                // Mirror coordinates to match scaleX(-1) mirror preview
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);
                
                const dataUrl = canvas.toDataURL('image/jpeg');
                selectedCoverUrl = dataUrl;
                
                if (storyCustomCover) {
                    storyCustomCover.value = dataUrl;
                    storyCustomCover.dispatchEvent(new Event('input'));
                }
                
                // Remove selection from preset cover thumbs
                document.querySelectorAll('.preset-cover-thumb').forEach(thumb => {
                    thumb.classList.remove('selected');
                });
                
                showToast("Photo captured as custom cover!");
                stopCamera();
            } catch (err) {
                console.error("Failed to capture photo:", err);
                showToast("Failed to capture photo.");
            }
        });
    }

    // -----------------------------------------------------------------
    // Document Attachments Logic (Writer's Workshop)
    // -----------------------------------------------------------------
    const storyAttachmentBrowseBtn = document.getElementById('storyAttachmentBrowseBtn');
    const storyAttachmentFile = document.getElementById('storyAttachmentFile');
    const editorAttachmentsList = document.getElementById('editorAttachmentsList');

    if (storyAttachmentBrowseBtn && storyAttachmentFile) {
        storyAttachmentBrowseBtn.addEventListener('click', () => {
            storyAttachmentFile.click();
        });
    }

    if (storyAttachmentFile) {
        storyAttachmentFile.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            let tooLarge = false;
            
            const processFile = (file) => {
                return new Promise((resolve) => {
                    // Check size limit: 5MB (5 * 1024 * 1024 bytes)
                    if (file.size > 5 * 1024 * 1024) {
                        tooLarge = true;
                        resolve(null);
                        return;
                    }
                    
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        // Extract base64 part only
                        const dataUrl = event.target.result;
                        const base64Data = dataUrl.split(',')[1];
                        resolve({
                            name: file.name,
                            size: file.size,
                            type: file.type || 'application/octet-stream',
                            data: base64Data
                        });
                    };
                    reader.readAsDataURL(file);
                });
            };
            
            Promise.all(files.map(processFile)).then(results => {
                const validResults = results.filter(r => r !== null);
                if (validResults.length > 0) {
                    selectedAttachments.push(...validResults);
                    renderEditorAttachments();
                    updateLivePreview();
                }
                
                if (tooLarge) {
                    showToast("Some files exceeded the 5MB size limit and were skipped.");
                }
                
                // Clear the input so the same file can be selected again
                storyAttachmentFile.value = '';
            });
        });
    }

    function renderEditorAttachments() {
        if (!editorAttachmentsList) return;
        
        if (selectedAttachments.length === 0) {
            editorAttachmentsList.innerHTML = '';
            return;
        }
        
        editorAttachmentsList.innerHTML = selectedAttachments.map((att, idx) => `
            <li class="editor-attachment-item">
                <div class="editor-attachment-info">
                    <span class="editor-attachment-name" title="${escapeHTML(att.name)}">${escapeHTML(att.name)}</span>
                    <span class="editor-attachment-size">${formatFileSize(att.size)}</span>
                </div>
                <button type="button" class="editor-attachment-remove-btn" data-index="${idx}" title="Remove attachment">×</button>
            </li>
        `).join('');
        
        // Wire up remove buttons
        editorAttachmentsList.querySelectorAll('.editor-attachment-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.getAttribute('data-index'));
                selectedAttachments.splice(index, 1);
                renderEditorAttachments();
                updateLivePreview();
            });
        });
    }

    // Convert Base64 back to Binary Blob and download it
    function downloadAttachment(attachment) {
        try {
            const byteCharacters = atob(attachment.data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: attachment.type });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = attachment.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
            
            showToast(`Downloading: ${attachment.name}`);
        } catch (err) {
            console.error("Failed to decode/download attachment:", err);
            showToast("Failed to download attachment.");
        }
    }

    // Format file sizes nicely
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    function getAttachmentClass(type, name) {
        const lowerType = (type || '').toLowerCase();
        const ext = name ? name.split('.').pop().toLowerCase() : '';
        
        if (lowerType === 'application/pdf' || ext === 'pdf') {
            return 'type-pdf';
        } else if (lowerType.includes('word') || lowerType.includes('msword') || ext === 'doc' || ext === 'docx') {
            return 'type-word';
        } else if (lowerType.includes('excel') || lowerType.includes('spreadsheet') || ext === 'xls' || ext === 'xlsx') {
            return 'type-excel';
        } else if (lowerType.includes('zip') || lowerType.includes('compressed') || ext === 'zip' || ext === 'rar' || ext === '7z') {
            return 'type-zip';
        }
        return 'type-generic';
    }

    // Build cover presets selection buttons
    function renderPresetCovers() {
        presetCoversGrid.innerHTML = coverPresets.map(preset => `
            <div class="preset-cover-thumb ${preset.url === selectedCoverUrl ? 'selected' : ''}" 
                 style="background-image: url('${preset.url}')" 
                 data-url="${preset.url}"
                 title="${preset.name}">
            </div>
        `).join('');

        // Selection event
        presetCoversGrid.querySelectorAll('.preset-cover-thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                presetCoversGrid.querySelectorAll('.preset-cover-thumb').forEach(t => t.classList.remove('selected'));
                thumb.classList.add('selected');
                selectedCoverUrl = thumb.getAttribute('data-url');
                if (storyCustomCover) {
                    storyCustomCover.value = '';
                }
                updateLivePreview();
            });
        });
    }

    // Live preview update triggers
    [storyTitle, storyAuthor, storyCategory, storyLanguage, storyReadTime, storyBody, storyCustomCover].forEach(input => {
        if (input) {
            input.addEventListener('input', updateLivePreview);
            input.addEventListener('change', updateLivePreview);
        }
    });

    function updateLivePreview() {
        const title = storyTitle.value.trim();
        const author = storyAuthor.value.trim();
        const category = storyCategory.value;
        const readTime = storyReadTime.value;
        const body = storyBody.value.trim();

        // Word count
        const wordCount = body === '' ? 0 : body.split(/\s+/).length;
        editorWordCount.textContent = `${wordCount} words`;

        // Auto-calculate read time if body changes and user hasn't touched the readTime input
        if (wordCount > 0) {
            const calculatedTime = Math.max(1, Math.round(wordCount / 180));
            storyReadTime.value = calculatedTime;
        }

        if (storyCustomCover && document.activeElement === storyCustomCover) {
            selectedCoverUrl = storyCustomCover.value.trim();
            // Remove selection from preset cover thumbs
            document.querySelectorAll('.preset-cover-thumb').forEach(thumb => {
                thumb.classList.remove('selected');
            });
        }

        const previewCoverImg = document.getElementById('previewCoverImg');
        if (previewCoverImg) {
            if (selectedCoverUrl) {
                previewCoverImg.style.backgroundImage = `url('${selectedCoverUrl}')`;
                previewCoverImg.style.display = 'block';
            } else {
                previewCoverImg.style.display = 'none';
            }
        }

        if (title === '' && author === '' && body === '') {
            previewPlaceholder.style.display = 'flex';
            previewContent.style.display = 'none';
        } else {
            previewPlaceholder.style.display = 'none';
            previewContent.style.display = 'block';

            const language = storyLanguage ? storyLanguage.value : 'english';
            const isRtl = language === 'arabic' || language === 'urdu';
            if (isRtl) {
                previewContent.setAttribute('dir', 'rtl');
                previewContent.style.textAlign = 'right';
                previewBodyText.style.fontFamily = '"Lora", "Noto Naskh Arabic", "Noto Nastaliq Urdu", serif';
            } else {
                previewContent.removeAttribute('dir');
                previewContent.style.textAlign = '';
                if (language === 'malayalam') {
                    previewBodyText.style.fontFamily = '"Lora", "Noto Sans Malayalam", serif';
                } else {
                    previewBodyText.style.fontFamily = '';
                }
            }

            previewCategoryBadge.textContent = category.replace('-', ' ');
            previewTitleText.textContent = title || 'Untitled Masterpiece';
            previewMetaText.textContent = `By ${author || 'Anonymous Writer'} • ${storyReadTime.value || 1} min read`;
            
            // Limit preview body rendering length
            const displayBody = body || 'Start typing in the text box...';
            previewBodyText.innerHTML = displayBody.replace(/\n/g, '<br>');
        }

        // Update live preview attachment info
        const previewAttachmentsInfo = document.getElementById('previewAttachmentsInfo');
        const previewAttachmentsCount = document.getElementById('previewAttachmentsCount');
        if (previewAttachmentsInfo && previewAttachmentsCount) {
            if (selectedAttachments && selectedAttachments.length > 0) {
                previewAttachmentsInfo.style.display = 'inline-flex';
                previewAttachmentsCount.textContent = `${selectedAttachments.length} file${selectedAttachments.length === 1 ? '' : 's'} attached`;
            } else {
                previewAttachmentsInfo.style.display = 'none';
            }
        }
    }

    // Handle Publish Click
    publishBtn.addEventListener('click', () => {
        const title = storyTitle.value.trim();
        const author = storyAuthor.value.trim() || 'Anonymous Writer';
        const category = storyCategory.value;
        const language = storyLanguage ? storyLanguage.value : 'english';
        const readTime = parseInt(storyReadTime.value) || 3;
        const body = storyBody.value.trim();

        if (!title) {
            alert('Your literature work needs a title!');
            storyTitle.focus();
            return;
        }
        if (!body) {
            alert('Your literature work cannot have an empty body!');
            storyBody.focus();
            return;
        }

        const bodyParagraphs = body.split('\n\n').filter(p => p.trim() !== '');
        let milestones = [
            `Started reading "${title}" by ${author}`,
            `Reached the heart of this ${category.replace('-', ' ')} publication`,
            `Finished reciting this wonderful piece of literature`
        ];

        // -------------------------------------------------------------
        // BRANCH A: Editing an existing article (Editor Mode)
        // -------------------------------------------------------------
        if (postToEditId !== null) {
            const artIndex = articles.findIndex(a => a.id === postToEditId);
            if (artIndex !== -1) {
                articles[artIndex].title = title;
                articles[artIndex].author = author;
                articles[artIndex].category = category;
                articles[artIndex].language = language;
                articles[artIndex].readTime = readTime;
                articles[artIndex].body = body;
                articles[artIndex].cover = selectedCoverUrl;
                articles[artIndex].excerpt = body.substring(0, 110) + (body.length > 110 ? '...' : '');
                articles[artIndex].milestones = milestones;
                articles[artIndex].attachments = [...selectedAttachments];
                articles[artIndex].status = 'approved'; // Make sure edited articles are approved

                localStorage.setItem('as_articles', JSON.stringify(articles));
                
                closeWriterWorkshop();
                renderFeed();
                updateEditorUI();
                
                if (activeArticle && activeArticle.id === postToEditId) {
                    openArticle(postToEditId);
                }
                
                postToEditId = null;
                showToast(`"${title}" updated successfully.`);
            }
            return;
        }

        // -------------------------------------------------------------
        // BRANCH B: Creating a new article as logged-in Editor
        // -------------------------------------------------------------
        if (isEditorLoggedIn) {
            const newWork = {
                id: 'work-' + Date.now(),
                title: title,
                author: author,
                category: category,
                language: language,
                readTime: readTime,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                cover: selectedCoverUrl,
                excerpt: body.substring(0, 110) + (body.length > 110 ? '...' : ''),
                body: body,
                milestones: milestones,
                status: 'approved',
                attachments: [...selectedAttachments]
            };

            articles.unshift(newWork);
            localStorage.setItem('as_articles', JSON.stringify(articles));
            
            closeWriterWorkshop();
            renderFeed();
            updateEditorUI();
            showToast(`"${title}" published successfully!`);
            return;
        }

        // -------------------------------------------------------------
        // BRANCH C: Normal Reader Submitting Draft (Simulated Dispatch)
        // -------------------------------------------------------------
        const emailDispatchModal = document.getElementById('emailDispatchModal');
        const emailSendingStage = document.getElementById('emailSendingStage');
        const emailSuccessStage = document.getElementById('emailSuccessStage');
        const emailSubjectText = document.getElementById('emailSubjectText');
        const emailBodyPreview = document.getElementById('emailBodyPreview');
        const emailDismissBtn = document.getElementById('emailDismissBtn');

        if (emailDispatchModal && emailSendingStage && emailSuccessStage) {
            emailDispatchModal.classList.add('active');
            emailSendingStage.style.display = 'flex';
            emailSuccessStage.style.display = 'none';

            // Background tap to close
            const onBgClick = (e) => {
                if (e.target === emailDispatchModal) {
                    emailDispatchModal.classList.remove('active');
                    emailDispatchModal.removeEventListener('click', onBgClick);
                }
            };
            emailDispatchModal.addEventListener('click', onBgClick);

            setTimeout(() => {
                if (emailSubjectText) {
                    emailSubjectText.textContent = `New Draft Submission: ${title}`;
                }
                if (emailBodyPreview) {
                    emailBodyPreview.textContent = body.substring(0, 150) + (body.length > 150 ? '...' : '');
                }

                emailSendingStage.style.display = 'none';
                emailSuccessStage.style.display = 'flex';

                const newWork = {
                    id: 'work-' + Date.now(),
                    title: title,
                    author: author,
                    category: category,
                    language: language,
                    readTime: readTime,
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    cover: selectedCoverUrl,
                    excerpt: body.substring(0, 110) + (body.length > 110 ? '...' : ''),
                    body: body,
                    milestones: milestones,
                    status: 'pending',
                    attachments: [...selectedAttachments]
                };

                articles.unshift(newWork);
                localStorage.setItem('as_articles', JSON.stringify(articles));

                closeWriterWorkshop();
                renderFeed();
                updateEditorUI();

                const handleDismiss = () => {
                    emailDispatchModal.classList.remove('active');
                    emailDismissBtn.removeEventListener('click', handleDismiss);
                };
                if (emailDismissBtn) {
                    emailDismissBtn.addEventListener('click', handleDismiss);
                }

                showToast(`Draft submitted to duhiraupdates@gmail.com! Story is queued for moderation review.`);
            }, 150);
        }
    });

    function showToast(message) {
        toast.textContent = message;
        toast.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            toast.style.transform = 'translateY(150px)';
        }, 4000);
    }

    // -----------------------------------------------------------------
    // Comments Review System (LocalStorage-persistent per story)
    // -----------------------------------------------------------------
    const commentCountLabel = document.getElementById('commentCount');
    const commentsList = document.getElementById('commentsList');
    const commentTextInput = document.getElementById('commentText');
    const commentAuthorInput = document.getElementById('commentAuthor');
    const postCommentBtn = document.getElementById('postCommentBtn');

    function renderComments() {
        if (!activeArticle) return;
        const articleId = activeArticle.id;
        
        // Get critiques for this story
        const storyCritiques = comments[articleId] || [];
        
        // Update label count
        commentCountLabel.textContent = `${storyCritiques.length} Review${storyCritiques.length === 1 ? '' : 's'}`;

        // Generate Sidebar Top Critiques dynamically
        updateSidebarCritiques();

        if (storyCritiques.length === 0) {
            commentsList.innerHTML = `
                <div style="text-align:center; padding: 25px 0; color: var(--text-secondary); font-style: italic;">
                    No critiques posted yet. Be the first to share your interpretation!
                </div>
            `;
            return;
        }

        // Sort comments by upvotes (highest first)
        const sortedCritiques = [...storyCritiques].sort((a, b) => b.upvotes - a.upvotes);

        commentsList.innerHTML = sortedCritiques.map(c => {
            const upvotedList = JSON.parse(localStorage.getItem('upvoted_critiques') || '[]');
            const isUpvoted = upvotedList.includes(c.id);

            return `
                <div class="comment-card" id="comment-${c.id}">
                    <div class="comment-meta">
                        <div class="comment-author">
                            ${c.author}
                            ${c.role ? `<span style="font-weight:normal; font-size:11px; opacity:0.75;">(${c.role})</span>` : ''}
                        </div>
                        <div style="font-size:11px;">${c.timestamp}</div>
                    </div>
                    <div class="comment-body">${escapeHTML(c.body)}</div>
                    <div class="comment-actions">
                        <button class="comment-action-btn ${isUpvoted ? 'upvoted' : ''}" data-id="${c.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                            <span>Helpful (${c.upvotes})</span>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Wire up upvote buttons
        commentsList.querySelectorAll('.comment-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const commentId = btn.getAttribute('data-id');
                upvoteComment(commentId);
            });
        });
    }

    function upvoteComment(id) {
        if (!activeArticle) return;
        const articleId = activeArticle.id;
        
        let upvotedList = JSON.parse(localStorage.getItem('upvoted_critiques') || '[]');
        let storyCritiques = comments[articleId] || [];

        const commentIdx = storyCritiques.findIndex(c => c.id === id);
        if (commentIdx === -1) return;

        if (upvotedList.includes(id)) {
            storyCritiques[commentIdx].upvotes -= 1;
            upvotedList = upvotedList.filter(item => item !== id);
        } else {
            storyCritiques[commentIdx].upvotes += 1;
            upvotedList.push(id);
        }

        comments[articleId] = storyCritiques;
        localStorage.setItem('as_comments', JSON.stringify(comments));
        localStorage.setItem('upvoted_critiques', JSON.stringify(upvotedList));
        renderComments();
    }

    postCommentBtn.addEventListener('click', () => {
        if (!activeArticle) return;
        const articleId = activeArticle.id;

        const body = commentTextInput.value.trim();
        const author = commentAuthorInput.value.trim() || 'Anonymous Pen';

        if (!body) {
            alert('Critique review text cannot be empty!');
            commentTextInput.focus();
            return;
        }

        const newCritique = {
            id: 'crit-' + Date.now(),
            author: author,
            role: 'Critic',
            body: body,
            timestamp: 'Just now',
            upvotes: 0
        };

        if (!comments[articleId]) {
            comments[articleId] = [];
        }

        comments[articleId].unshift(newCritique);
        localStorage.setItem('as_comments', JSON.stringify(comments));

        commentTextInput.value = '';
        renderComments();
        showToast('Critique posted successfully.');
    });

    function updateSidebarCritiques() {
        const allCritiques = [];
        for (const [storyId, critiques] of Object.entries(comments)) {
            const story = articles.find(a => a.id === storyId);
            if (!story) continue;

            critiques.forEach(c => {
                // Get relative sorting value
                let timeValue = 0;
                if (c.id.startsWith('crit-')) {
                    timeValue = parseInt(c.id.split('-')[1]) || 0;
                } else {
                    if (c.timestamp === 'Just now') timeValue = Date.now();
                    else if (c.timestamp === '1 day ago') timeValue = Date.now() - 24 * 60 * 60 * 1000;
                    else if (c.timestamp === '2 days ago') timeValue = Date.now() - 2 * 24 * 60 * 60 * 1000;
                    else if (c.timestamp === '3 days ago') timeValue = Date.now() - 3 * 24 * 60 * 60 * 1000;
                    else if (c.timestamp === '1 week ago') timeValue = Date.now() - 7 * 24 * 60 * 60 * 1000;
                }

                allCritiques.push({
                    storyTitle: story.title,
                    storyId: story.id,
                    author: c.author,
                    body: c.body,
                    timestamp: c.timestamp,
                    upvotes: c.upvotes || 0,
                    timeValue: timeValue
                });
            });
        }

        // Sort: newest comments first
        allCritiques.sort((a, b) => b.timeValue - a.timeValue);

        const sidebarList = document.getElementById('sidebarCritiqueList');
        if (!sidebarList) return;

        if (allCritiques.length === 0) {
            sidebarList.innerHTML = `
                <li style="font-size:12px; color:var(--text-secondary); font-style:italic;">
                    No critiques in the network yet. Read an article and write a review!
                </li>
            `;
            return;
        }

        // Display up to 3 critiques
        const displayCritiques = allCritiques.slice(0, 3);
        sidebarList.innerHTML = displayCritiques.map(c => `
            <li class="feed-item">
                <span class="feed-tag">${c.author} on ${c.storyTitle} (${c.upvotes} ★)</span>
                <a href="#" class="feed-link sidebar-critique-item-link" data-id="${c.storyId}">
                    "${c.body.length > 55 ? c.body.substring(0, 52) + '...' : c.body}"
                </a>
            </li>
        `).join('');

        // Wire sidebar links to open corresponding story
        sidebarList.querySelectorAll('.sidebar-critique-item-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const storyId = link.getAttribute('data-id');
                openArticle(storyId);
            });
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // -----------------------------------------------------------------
    // Text to Speech Audio Reciter
    // -----------------------------------------------------------------
    const ttsPlayBtn = document.getElementById('ttsPlayBtn');
    const ttsStopBtn = document.getElementById('ttsStopBtn');
    let synth = window.speechSynthesis;
    let utterance = null;

    if (!synth) {
        const audioWidget = document.querySelector('.narrator-widget');
        if (audioWidget) audioWidget.style.display = 'none';
    }

    ttsPlayBtn.addEventListener('click', () => {
        if (!synth) return;

        if (synth.speaking && !synth.paused) {
            synth.pause();
            ttsPlayBtn.querySelector('.btn-text').textContent = 'Resume';
            ttsPlayBtn.querySelector('.btn-icon').textContent = '▶';
            ttsPlayBtn.classList.remove('playing');
        } else if (synth.paused) {
            synth.resume();
            ttsPlayBtn.querySelector('.btn-text').textContent = 'Pause';
            ttsPlayBtn.querySelector('.btn-icon').textContent = '⏸';
            ttsPlayBtn.classList.add('playing');
        } else {
            startSpeaking();
        }
    });

    ttsStopBtn.addEventListener('click', stopSpeaking);

    function startSpeaking() {
        if (!synth || !activeArticle) return;
        synth.cancel();

        const reciteText = `${activeArticle.title} by ${activeArticle.author}. ${activeArticle.body}`;
        
        utterance = new SpeechSynthesisUtterance(reciteText);
        utterance.rate = 0.9; // Slower, majestic recitation
        utterance.pitch = 1.0;

        const artLang = activeArticle.language || 'english';
        let langCode = 'en';
        if (artLang === 'arabic') langCode = 'ar';
        else if (artLang === 'urdu') langCode = 'ur';
        else if (artLang === 'hindi') langCode = 'hi';
        else if (artLang === 'malayalam') langCode = 'ml';

        utterance.lang = langCode;

        const voices = synth.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.lang.startsWith(langCode)
        );
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.onend = () => {
            stopSpeaking();
        };
        utterance.onerror = () => {
            stopSpeaking();
        };

        ttsPlayBtn.querySelector('.btn-text').textContent = 'Pause';
        ttsPlayBtn.querySelector('.btn-icon').textContent = '⏸';
        ttsPlayBtn.classList.add('playing');
        ttsStopBtn.style.display = 'inline-flex';

        synth.speak(utterance);
    }

    function stopSpeaking() {
        if (!synth) return;
        synth.cancel();
        ttsPlayBtn.querySelector('.btn-text').textContent = 'Listen';
        ttsPlayBtn.querySelector('.btn-icon').textContent = '▶';
        ttsPlayBtn.classList.remove('playing');
        ttsStopBtn.style.display = 'none';
    }

    window.addEventListener('beforeunload', () => {
        if (synth) synth.cancel();
    });

    // -----------------------------------------------------------------
    // Initial Render Actions
    // -----------------------------------------------------------------
    renderFeed();
    updateSidebarCritiques();
});
