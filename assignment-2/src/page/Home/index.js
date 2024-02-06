import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";

import { DATA_BOOKS, DATA_TOPIC } from "../../data";

import useModal from "../../hooks/useModal";

import InputCommon from "../../components/InputCommon";
import ButtonCommon from "../../components/ButtonCommon";
import ModalCommon from "../../components/ModalCommon";
import Dropdown from "../../components/Dropdown";
import Pagination from "../../components/Pagination";
import ToggleSwitch from "../../components/ToggleSwitch";

let PageSize = 3;

const Home = () => {
  const { isShowing, toggle } = useModal();

  const [currentModal, setCurrentModal] = useState(null);

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [topicSelected, setTopicSelected] = useState(DATA_TOPIC[0]?.name);
  const [dataListBooks, setDataListBooks] = useState(DATA_BOOKS);
  const [filterDataListBooks, setFilterDataListBooks] = useState(dataListBooks);

  const [currentPage, setCurrentPage] = useState(1);

  const [bookSelected, setBookSelected] = useState({
    id: 1,
    name: "",
  });

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterDataListBooks.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filterDataListBooks]);

  useEffect(() => {
    setFilterDataListBooks(dataListBooks);
  }, [dataListBooks]);

  const onChangeSearch = (event) => {
    setSearch(event.target.value);

    if (event.target.value !== "") {
      const newListBook = dataListBooks.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      );

      setFilterDataListBooks(newListBook);
    } else {
      setFilterDataListBooks(dataListBooks);
    }
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleShowModalAdd = () => {
    setName("");
    setAuthor("");
    setTopicSelected(DATA_TOPIC[0]?.name);

    setCurrentModal("AddModal");

    toggle();
  };

  const handleShowModalDelete = (item) => {
    setCurrentModal("DeleteModal");

    toggle();

    console.log("ITEM: ", item);

    setBookSelected({
      id: item.id,
      name: item.name,
    });
  };

  const handleCreateBook = (event) => {
    event.preventDefault();

    const payload = {
      id: Date.now(),
      name,
      author,
      topic: topicSelected,
    };

    const newListBook = [...dataListBooks, payload];

    setDataListBooks(newListBook);
    toggle();
  };

  const handleDeleteBook = () => {
    const newListBook = dataListBooks.filter(
      (item) => item.id !== bookSelected?.id
    );

    setDataListBooks(newListBook);
    toggle();
  };

  return (
    <Container>
      <Header>
        <HeaderContainer>
          <TextH1>Bookstore</TextH1>
          <HeaderRightContainer>
            <SwitchContainer>
              <ToggleSwitch />
              <TextThemeMode></TextThemeMode>
            </SwitchContainer>
            <ProfileContainer>
              <ImageWrapper>
                <Image
                  src="https://cdn.icon-icons.com/icons2/3054/PNG/512/account_profile_user_icon_190494.png"
                  alt="profile"
                />
              </ImageWrapper>
              <TextProfileName>John Doe</TextProfileName>
            </ProfileContainer>
          </HeaderRightContainer>
        </HeaderContainer>
      </Header>
      <Main>
        <MainWrapper>
          <RowContainer>
            <InputCommon
              type="text"
              value={search}
              placeholder="Search books"
              onChange={onChangeSearch}
            />
            <ButtonCommon onClick={handleShowModalAdd} title={"Add book"} />
          </RowContainer>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Author</TableHeaderCell>
                  <TableHeaderCell>Topic</TableHeaderCell>
                  <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
              </TableHead>
              {currentTableData?.map((item) => {
                return (
                  <TableBody key={item?.id}>
                    <TableRow>
                      <TableDataCell>{item?.name}</TableDataCell>
                      <TableDataCell>{item?.author}</TableDataCell>
                      <TableDataCell> {item?.topic}</TableDataCell>
                      <TableDataCell>
                        <ButtonDelete
                          onClick={() => handleShowModalDelete(item)}
                        >
                          {"Delete"}
                        </ButtonDelete>
                      </TableDataCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TableContainer>
          <Pagination
            currentPage={currentPage}
            totalCount={filterDataListBooks.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </MainWrapper>

        {currentModal === "AddModal" ? (
          <ModalCommon title={"Add book"} isShowing={isShowing} hide={toggle}>
            <FormInput onSubmit={handleCreateBook}>
              <LabelForm htmlFor="name">Name</LabelForm>
              <InputCommon
                type="text"
                value={name}
                name="name"
                placeholder="Name"
                onChange={onChangeName}
                autoFocus
                required
              />
              <LabelForm htmlFor="author">Author</LabelForm>
              <InputCommon
                type="text"
                value={author}
                name="author"
                placeholder="Author"
                onChange={onChangeAuthor}
                required
              />
              <LabelForm htmlFor="topic">Topic</LabelForm>
              <Dropdown
                valueSelected={topicSelected}
                setValueSelected={setTopicSelected}
              />
              <ModalFooter>
                <ButtonCommon type="submit" title={"Create"} />
              </ModalFooter>
            </FormInput>
          </ModalCommon>
        ) : (
          <ModalCommon
            title={"Delete book"}
            isShowing={isShowing}
            hide={toggle}
          >
            <TextDelete>
              Do you want to delete
              <TextBookName> {bookSelected?.name}</TextBookName> book?
            </TextDelete>
            <ModalFooter>
              <ButtonDeleteBook onClick={handleDeleteBook} title={"Delete"} />
              <ButtonCommon
                onClick={() => {
                  toggle();
                }}
                title={"Cancel"}
              />
            </ModalFooter>
          </ModalCommon>
        )}
      </Main>
    </Container>
  );
};

const Container = styled.div``;

const Header = styled.header`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Main = styled.main`
  background-color: #f5f8f9;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100vw;
  height: 100vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderRightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
`;

const TextH1 = styled.h1``;

const ImageWrapper = styled.div`
  width: 6vh;
  height: 6vh;
  background-color: #bac9d4;
  border-radius: 50%;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

const TextProfileName = styled.p``;

const MainWrapper = styled.div`
  margin-top: 8px;
  background-color: #f5f8f9;
  background-size: cover;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
`;

const TableContainer = styled.div`
  margin-top: 16px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHead = styled.thead``;

const TableRow = styled.tr`
  border: 2px solid #bac9d4;
  text-align: left;
  padding: 8px;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const TableHeaderCell = styled.th`
  border: 2px solid #bbc7d0;
  text-align: left;
  padding: 8px;
  color: #000000;
`;

const TableDataCell = styled.td`
  border: 2px solid #bbc7d0;
  text-align: left;
  padding: 8px;
  color: #000000;
`;

const TableBody = styled.tbody``;

const ButtonDelete = styled.button`
  border: none;
  background-color: transparent;
  color: #d63b51;
  text-decoration: underline;
  cursor: pointer;
`;

const FormInput = styled.form``;

const LabelForm = styled.label`
  display: block;
  margin-top: 12px;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const TextDelete = styled.p`
  margin-bottom: 28px;
  text-align: center;
`;

const TextBookName = styled.span`
  font-weight: bold;
  color: black;
`;

const ButtonDeleteBook = styled(ButtonCommon)`
  background-color: #ffffff;
  color: black;

  &:hover {
    background-color: #bac9d4;
    cursor: pointer;
  }
`;

const TextThemeMode = styled.span`
  font-size: 16px;
  color: black;
  margin-right: 8px;
  margin-left: 8px;
`;

export default Home;
