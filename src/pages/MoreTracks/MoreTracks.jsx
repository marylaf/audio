import PropTypes from 'prop-types';
import './MoreTracks.css';


function MoreTracks({handleLoadMore}) {
    return(
        <section className="more">
            <button onClick={handleLoadMore} className="more__paragraph">Ещё</button>
        </section>
    );
}

MoreTracks.propTypes = {
    handleLoadMore: PropTypes.func.isRequired,
  };

export default MoreTracks;