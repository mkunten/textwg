<script>
import {
  resolveComponent,
  toRef,
  h,
  useCssModule,
} from 'vue';
import { useStore } from 'vuex';
import TeiApp from '@/components/TeiApp.vue';

export default {
  name: 'TeiNodes',

  components: {
    TeiApp,
  },

  props: {
    el: { type: Object, default: null, required: true },
    parents: { type: Array, default: () => [], required: false },
  },

  setup(props) {
    // store
    const store = useStore();

    // style
    const style = useCssModule();

    // components
    const mdicon = resolveComponent('mdicon');
    const TeiNodes = resolveComponent('TeiNodes');

    // enum
    const URI_TYPE = {
      RAW_IMAGE: 'raw_image',
      IIIF_IMAGE: 'IIIF_image',
      CANVAS_ID: 'canvasId',
      KOTENSEKI_NIJL: 'kotenseki_nijl',
      OHTER: 'other',
    };

    // props
    const elRef = toRef(props, 'el');
    const parentsRef = toRef(props, 'parents');

    // methods
    const renderChild = (el) => h(
      TeiNodes,
      {
        el,
        parents: parentsRef.value.concat(elRef.value.name),
      },
    );

    const descernURI = (uri) => {
      if (/\.(jpg|png|tiff?)$/i.test(uri)) {
        return { type: URI_TYPE.RAW_IMAGE };
      }
      if (/\.(jpg|png|tiff?)\/.*?\/.*?\/.*?\/.*\.(jpg|png|tiff?)$/i
        .test(uri)) {
        return { type: URI_TYPE.IIIF_IMAGE };
      }
      if (/\/canvas\/.*?$/.test(uri)) {
        return { type: URI_TYPE.CANVAS_ID };
      }
      if (/\/\/kotenseki.nijl.ac.jp\/biblio\/\d+\/viewer\/(\d+)$/.test(uri)) {
        return {
          type: URI_TYPE.KOTENSEKI_NIJL,
          frame: parseInt(RegExp.$1, 10) - 1,
        };
      }
      return { type: URI_TYPE.OTHER };
    };

    const jumpToByCanvasId = (canvasId) => {
      store.dispatch('setM3Param', {
        key: 'canvasId',
        value: canvasId,
      });
    };

    const jumpToByFrame = (frame) => {
      store.dispatch('setM3Param', {
        key: 'frame',
        value: frame,
      });
    };

    const createVNodeByURI = (uri) => {
      const r = descernURI(uri);
      switch (r.type) {
        case URI_TYPE.CANVAS_ID: {
          return h(
            mdicon,
            {
              name: 'book-open-page-variant-outline',
              title: 'ビューワ上で移動',
              onClick: (e) => {
                jumpToByCanvasId(elRef.value.attributes.n);
                e.preventDefault();
              },
            },
          );
        }
        case URI_TYPE.KOTENSEKI_NIJL: {
          return [
            h(
              'a',
              {
                target: '_blank',
                title: '外部サイトを開く',
                href: elRef.value.attributes.facs,
              },
              h(mdicon, { name: 'open-in-new' }),
            ), h(
              mdicon,
              {
                name: 'book-open-page-variant-outline',
                title: 'ビューア上で移動',
                onClick: (e) => {
                  jumpToByFrame(r.frame);
                  e.preventDefault();
                },
              },
            ),
          ];
        }
        case URI_TYPE.RAW_IMAGE:
        case URI_TYPE.IIIF_IMAGE: {
          return h(
            'a',
            {
              target: '_blank',
              title: '画像を開く',
              href: elRef.value.attributes.facs,
            },
            h(mdicon, { name: 'file-image-outline' }),
          );
        }
        case URI_TYPE.OTHER: {
          return h(
            'a',
            {
              target: '_blank',
              title: '外部サイトを開く',
              href: elRef.value.attributes.facs,
            },
            h(mdicon, { name: 'open-in-new' }),
          );
        }
        default: {
          return null;
        }
      }
    };

    const getClassName = () => style[`tei-${elRef.value.name}`];

    // render
    let vnodes = null;

    switch (elRef.value.type) {
      case 'text':
        if (elRef.value.text) {
          vnodes = h('span', elRef.value.text);
        }
        break;
      case 'element':
        switch (elRef.value.name) {
          case 'pb':
            if (elRef.value.attributes.n) {
              vnodes = h(
                'span',
                { class: getClassName() },
                `【${elRef.value.attributes.n}】`,
              );
            }
            if (elRef.value.attributes.facs) {
              const a = [h('br')];
              if (vnodes) {
                a.push(vnodes);
              }
              const n = createVNodeByURI(elRef.value.attributes.facs);
              if (n) {
                a.push(n);
              }
              vnodes = a;
            }
            break;
          case 'lb':
            vnodes = h('br', { class: getClassName() });
            break;
          case 'graphic':
            if (elRef.value.attributes.n) {
              vnodes = createVNodeByURI(elRef.value.attributes.n);
            }
            break;
          case 'app':
            vnodes = h(
              TeiApp,
              {
                el: elRef.value,
                parents: parentsRef.value,
              },
            );
            break;
          default:
            if (elRef.value.elements) {
              vnodes = elRef.value.elements.map((el) => renderChild(el));
            }
            break;
        }
        break;
      case 'cdata':
        break;
      case 'comment':
        break;
      default:
        // eslint-disable-next-line
        console.error('TeiNodes: unexpected type:', elRef.value);
        break;
    }
    return () => vnodes;
  },
};
</script>

<style module>
.tei-pb {
  color: grey;
}
</style>
