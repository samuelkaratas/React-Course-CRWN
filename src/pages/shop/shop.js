import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

//This is colled the container pattern. This is one way and can be implemented to CollectionPage component.
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview-container";
import CollectionPage from "../collection/collection";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";

import WithSpinner from "../../components/with-spinner/with-spinner";

const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
    /*LIVE UPDATES
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        this.setState({ loading: false });
      }
    );*/
    /*UPDATES WHEN COMPONENT MOUNTS ONCE
    collectionRef.get().then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });*/
    //USING NATIVE FETCH FUNCTION
    //fetch('https://firestore.googleapis.com/v1/projects/crwn-db-692a7/databases/(default)/documents/collections')
    //  .then(response => response.json()).then(collections => console.log(collections))
  }

  render() {
    const { match, isCollectionsLoaded } = this.props;
    return (
      <div>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionsLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionsLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
