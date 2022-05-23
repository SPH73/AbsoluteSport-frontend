<template>
    <footer class="section footer" id="footer-container">
        <div class="footer-grid">
            <div class="company-area footer-item">
                <router-link :to="{ name: 'home' }"
                    ><img src="@/assets/logo.webp" alt="AbsoluteSport"
                /></router-link>
                <p>ABSOLUTESPORT.AS LTD</p>
                <p>Company number: 11554323</p>
            </div>
            <div class="connect-area footer-item">
                <h5>CONNECT WITH US</h5>
                <router-link to="/">Phone</router-link>
                <router-link to="/">Message</router-link>
                <router-link to="/">Email</router-link>
                <router-link to="/contact">Contact Form</router-link>
                <router-link to="/">Facebook</router-link>
                <router-link to="/">LinkedIn</router-link>
                <router-link to="/">Instagram</router-link>
                <router-link to="/">About</router-link>
            </div>

            <div class="links-area footer-item">
                <h5>LINKS</h5>
                <div>
                    <router-link :to="{ name: 'clubs' }"
                        >School Clubs</router-link
                    >
                    <router-link :to="{ name: 'clubBooking' }"
                        >Book School Clubs</router-link
                    >
                    <router-link :to="{ name: 'parties' }"
                        >Kids Parties</router-link
                    >
                    <router-link :to="{ name: 'partyBooking' }"
                        >Request A Party Quote</router-link
                    >
                    <router-link :to="{ name: 'camps' }"
                        >Holiday Activity Camps</router-link
                    >
                    <router-link :to="{ name: 'campBooking' }"
                        >Book Upcoming Camps</router-link
                    >

                    <router-link :to="{ name: 'faqs' }">FAQ's</router-link>
                </div>
            </div>

            <div class="legal-area footer-item">
                <h5>LEGAL &#38; SITE MAP</h5>
                <router-link to="/">Privacy Policy</router-link>
                <router-link to="/">Disclaimer</router-link>
                <router-link to="/">T's &amp; C's</router-link>
                <router-link to="/">Policies &amp; Procedures</router-link>
                <router-link to="/">Site Map</router-link>
            </div>
        </div>
        <div class="footer-grid">
            <div class="copy-area footer-item">
                <h5>© 2022 AbsoluteSport</h5>
            </div>
            <div class="social-area footer-item">
                <h5>Share us!</h5>
                <div class="share-icons">
                    <a href="http://" target="_blank" rel="noopener noreferrer"
                        ><img
                            src="@/assets/facebook.svg"
                            alt="Facebook sharing icon"
                    /></a>
                    <a href="http://" target="_blank" rel="noopener noreferrer"
                        ><img
                            src="@/assets/instagram.svg"
                            alt="Instagram sharing icon"
                    /></a>
                </div>
            </div>
        </div>
        <div class="footer-grid">
            <div class="recog-area">
                <a
                    href="https://designdevelophost.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Website By Design Develop Host
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
export default {};
</script>

<style>
#footer-container {
    padding-block: 1rem;
}
.footer-grid {
    display: grid;
    gap: 0;
    align-items: flex-start;
    justify-items: stretch;
    justify-content: flex-start;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    font-variant: small-caps;
    font-family: Play, sans-serif;
    padding: 1rem;
    max-width: 1200%;
    width: 100%;
    margin: 0 auto;
}

footer a {
    display: block;
    padding: 1rem;
    font-size: 1.3rem;
}

footer h5 {
    margin-top: 1.2rem;
}
.footer-item {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
}

.footer-item:nth-of-type(1) {
    order: 4;
}
.footer-item:nth-of-type(2) {
    order: 2;
}
.footer-item:nth-of-type(3) {
    order: 1;
}
.footer-item:nth-of-type(4) {
    order: 3;
}
.company-area {
    justify-self: stretch;
    align-self: stretch;
    text-align: center;
    color: var(--color-light);
}

.company-area > p {
    color: var(--color-light);
}

.company-area img {
    width: 100%;
}

.links-area {
    justify-self: stretch;
    align-self: stretch;
}

.connect-area {
    justify-self: stretch;
    align-self: stretch;
}

.legal-area {
    justify-self: stretch;
    align-self: stretch;
}
.copy-area {
    justify-self: center;
    align-self: flex-start;
}

.recog-area {
    justify-self: center;
    align-self: flex-start;
}

.recog-area a {
    font-size: 1rem;
}
.social-area {
    justify-self: center;
    align-self: flex-start;
}

.share-icons {
    display: flex;
}
.share-icons a {
    padding-top: 0;
}

.section.footer {
    margin-top: auto;
    flex-shrink: 0;
    background-color: var(--color-secondary);
    color: var(--color-light);
}
</style>
