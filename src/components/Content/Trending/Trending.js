import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Trending = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 2 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    return (
        <>
            <h4 className="title">Trending today</h4>
            <div className="trending">

                <Carousel
                    className="trending_slider"
                    focusOnSelect={true}
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={false} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={2000}
                    keyBoardControl={false}
                    customTransition="transform 500ms linear"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    // deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    <div className="item">
                        <img src="https://external-preview.redd.it/7bN4mwskb7xZr0Cj59npWyJB7CPx3QHCqy_vyD19BEs.jpg?auto=webp&v=enabled&s=0af3af81a1636555137c99cbdbc5d411fe534e4b" className="item_img" />
                        <div className="trend-info">
                            <h5>No-Confidence Vote in France1</h5>
                            <p>Macron survives no-confidence votes over French pension reforma aaaa aaaaaa aa</p>
                            <div className="owner">
                                <img src="https://styles.redditmedia.com/t5_2n4vyh/styles/communityIcon_5h39ry24bx651.png?width=256&v=enabled&s=5d14f774183ef251b9a1376880a47c1ed5a23013"
                                    className="owner_img"
                                />
                                <span className="detail">r/anime_titties and more</span>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://external-preview.redd.it/qx4ZOKWsEFh4f0ClgGKDbP0RiQQY6yKGFZulc5YlCPA.jpg?auto=webp&v=enabled&s=0f40f36b31bfa7cfd4c712a00834ca609e1d9a32" className="item_img" />
                        <div className="trend-info">
                            <h5>Twitch Layoff 2</h5>
                            <p>Twitch Ceo lays off 400 employees</p>
                            <div className="owner">
                                <img src="https://styles.redditmedia.com/t5_38jf0/styles/communityIcon_ldprshtow1r81.png?width=256&v=enabled&s=40e3c1141b5c1f75e4c110037736f6b22ff4519b"
                                    className="owner_img"
                                />
                                <span className="detail">r/LivestreamFail and more</span>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://external-preview.redd.it/gLwo__j3WWx2kx9jLiiSGaNliryZQ9YYwUYI1shyBTo.jpg?auto=webp&v=enabled&s=09dd991eae887a1d851cc39e88555e6841763999" className="item_img" />
                        <div className="trend-info">
                            <h5>Oath Keepers Convicted 3</h5>
                            <p>Six Oath Keepers convicted in connection with January 6 US Capitol riot</p>
                            <div className="owner">
                                <img src="https://styles.redditmedia.com/t5_2n4vyh/styles/communityIcon_5h39ry24bx651.png?width=256&v=enabled&s=5d14f774183ef251b9a1376880a47c1ed5a23013"
                                    className="owner_img"
                                />
                                <span className="detail">r/news and more</span>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://external-preview.redd.it/7bN4mwskb7xZr0Cj59npWyJB7CPx3QHCqy_vyD19BEs.jpg?auto=webp&v=enabled&s=0af3af81a1636555137c99cbdbc5d411fe534e4b" className="item_img" />
                        <div className="trend-info">
                            <h5>Andy Kaufman 4</h5>
                            <p>Andy Kaufman to Be Inducted Into WWE Hall of Fame</p>
                            <div className="owner">
                                <img src="https://styles.redditmedia.com/t5_2n4vyh/styles/communityIcon_5h39ry24bx651.png?width=256&v=enabled&s=5d14f774183ef251b9a1376880a47c1ed5a23013"
                                    className="owner_img"
                                />
                                <span className="detail">r/anime_titties and more</span>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://external-preview.redd.it/7bN4mwskb7xZr0Cj59npWyJB7CPx3QHCqy_vyD19BEs.jpg?auto=webp&v=enabled&s=0af3af81a1636555137c99cbdbc5d411fe534e4b" className="item_img" />
                        <div className="trend-info">
                            <h5>No-Confidence Vote in France 5</h5>
                            <p>Macron survives no-confidence votes over French pension reforma aaaa aaaaaa aa</p>
                            <div className="owner">
                                <img src="https://styles.redditmedia.com/t5_2n4vyh/styles/communityIcon_5h39ry24bx651.png?width=256&v=enabled&s=5d14f774183ef251b9a1376880a47c1ed5a23013"
                                    className="owner_img"
                                />
                                <span className="detail">r/anime_titties and more</span>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://external-preview.redd.it/qx4ZOKWsEFh4f0ClgGKDbP0RiQQY6yKGFZulc5YlCPA.jpg?auto=webp&v=enabled&s=0f40f36b31bfa7cfd4c712a00834ca609e1d9a32" className="item_img" />
                        <div className="trend-info">
                            <h5>Twitch Layoff 6</h5>
                            <p>Twitch Ceo lays off 400 employees</p>
                            <div className="owner">
                                <img src="https://styles.redditmedia.com/t5_38jf0/styles/communityIcon_ldprshtow1r81.png?width=256&v=enabled&s=40e3c1141b5c1f75e4c110037736f6b22ff4519b"
                                    className="owner_img"
                                />
                                <span className="detail">r/LivestreamFail and more</span>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        </>
    )
}

export default Trending